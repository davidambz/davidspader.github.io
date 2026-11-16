"""Build an ATS-friendly .docx from the rendered resume page (DOM dump)."""
import sys
from html.parser import HTMLParser

from docx import Document
from docx.enum.text import WD_TAB_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Mm, Pt, RGBColor

ACCENT = RGBColor(0x0F, 0x76, 0x6E)
MUTED = RGBColor(0x6B, 0x6B, 0x73)


class Collect(HTMLParser):
    """Flatten the #cv markup into (kind, parts) blocks."""

    def __init__(self):
        super().__init__()
        self.blocks = []
        self.stack = []
        self.cur = None
        self.in_cv = False
        self.depth = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id') == 'cv':
            self.in_cv = True
        if not self.in_cv:
            return
        if tag == 'br':  # void element: never closes, so keep it off the stack
            if self.cur:
                self.cur[1].append(('\n', False))
            return
        cls = a.get('class', '')
        self.stack.append((tag, cls))
        if tag in ('h1', 'h2', 'p', 'h3'):
            kind = tag if tag != 'p' else ('p.' + cls if cls else 'p')
            self.cur = [kind, [], a.get('href')]
        elif tag == 'span' and 'when' in cls or tag == 'a' and 'when' in cls:
            self.cur = ['when', [], None]

    def handle_endtag(self, tag):
        if not self.in_cv or not self.stack:
            return
        t, cls = self.stack.pop()
        if self.cur and (t in ('h1', 'h2', 'p', 'h3') or 'when' in cls):
            text_parts = self.cur[1]
            if any(s.strip() for s, _ in text_parts):
                self.blocks.append((self.cur[0], text_parts))
            self.cur = None

    def handle_data(self, data):
        if self.cur is None:
            return
        bold = any(t == 'b' for t, _ in self.stack)
        muted = any('at' == c for _, c in self.stack)
        if data != '\n':
            core = ' '.join(data.split())
            lead = ' ' if data[:1].isspace() else ''
            trail = ' ' if data[-1:].isspace() and core else ''
            data = (lead + core + trail) if core else (' ' if data else '')
        if data:
            self.cur[1].append((data, 'bold' if bold else ('muted' if muted else False)))


def text_of(parts):
    return '\n'.join(' '.join(l.split()) for l in ''.join(s for s, _ in parts).split('\n')).strip()


def set_bottom_border(paragraph, color='E2DFDA', size=6):
    p_pr = paragraph._p.get_or_add_pPr()
    borders = OxmlElement('w:pBdr')
    bottom = OxmlElement('w:bottom')
    bottom.set(qn('w:val'), 'single')
    bottom.set(qn('w:sz'), str(size))
    bottom.set(qn('w:space'), '1')
    bottom.set(qn('w:color'), color)
    borders.append(bottom)
    p_pr.append(borders)


def main(html_path, out_path):
    c = Collect()
    c.feed(open(html_path, encoding='utf-8').read())

    doc = Document()
    sec = doc.sections[0]
    sec.page_width, sec.page_height = Mm(210), Mm(297)
    sec.left_margin = sec.right_margin = Mm(16)
    sec.top_margin = sec.bottom_margin = Mm(13)
    normal = doc.styles['Normal']
    normal.font.name = 'Calibri'
    normal.font.size = Pt(10)
    normal.paragraph_format.space_after = Pt(0)
    normal.paragraph_format.line_spacing = 1.1
    usable = sec.page_width - sec.left_margin - sec.right_margin

    def para(space_before=0, space_after=0):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        return p

    pending_head = None  # an h3 waiting for its date on the same line
    for kind, parts in c.blocks:
        text = text_of(parts)
        if kind == 'h1':
            r = para().add_run(text)
            r.bold = True
            r.font.size = Pt(22)
        elif kind == 'p.role':
            r = para(space_after=2).add_run(text)
            r.bold = True
            r.font.size = Pt(12)
            r.font.color.rgb = ACCENT
        elif kind == 'p.contacts':
            p = para(space_after=4)
            for line_i, line in enumerate(text.split('\n')):
                if line_i:
                    p.add_run().add_break()
                p.add_run(line.strip()).font.size = Pt(9.5)
            set_bottom_border(p, '17171C', 12)
        elif kind == 'h2':
            p = para(space_before=9, space_after=3)
            r = p.add_run(text.upper())
            r.bold = True
            r.font.size = Pt(9.5)
            r.font.color.rgb = ACCENT
            set_bottom_border(p)
        elif kind == 'h3':
            pending_head = parts
        elif kind == 'when':
            p = para(space_before=4)
            p.paragraph_format.tab_stops.add_tab_stop(usable, WD_TAB_ALIGNMENT.RIGHT)
            for s, style in pending_head or []:
                r = p.add_run(s)
                r.bold = style != 'muted'
                if style == 'muted':
                    r.font.color.rgb = MUTED
            r = p.add_run('\t' + text)
            r.font.size = Pt(9)
            r.font.color.rgb = MUTED
            pending_head = None
        elif kind == 'p.stack':
            r = para().add_run(text)
            r.font.size = Pt(8.5)
            r.font.color.rgb = MUTED
        else:
            if pending_head:  # a heading with no date
                p = para(space_before=4)
                r = p.add_run(text_of(pending_head))
                r.bold = True
                pending_head = None
            p = para()
            for s, style in parts:
                r = p.add_run(s)
                r.bold = style == 'bold'

    doc.save(out_path)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
