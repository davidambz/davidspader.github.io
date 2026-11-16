# Resume

`index.html` builds the resume from `js/content.js`, so it always matches the site.
Open `/resume/` (Portuguese) or `/resume/?lang=en` (English) with the site served locally.

Regenerate the files in `assets/curriculum/`:

```sh
python3 -m http.server 8080 --bind 127.0.0.1   # from the repo root
CHROME=chrome   # any Chromium-based browser

# PDF
$CHROME --headless=new --virtual-time-budget=6000 --no-pdf-header-footer \
  --print-to-pdf="assets/curriculum/Currículo - David Ambrozio.pdf" "http://127.0.0.1:8080/resume/"
$CHROME --headless=new --virtual-time-budget=6000 --no-pdf-header-footer \
  --print-to-pdf="assets/curriculum/Resume - David Ambrozio.pdf" "http://127.0.0.1:8080/resume/?lang=en"

# Word (needs: pip install python-docx)
$CHROME --headless=new --virtual-time-budget=6000 --dump-dom "http://127.0.0.1:8080/resume/" > /tmp/cv-pt.html
python3 resume/make_docx.py /tmp/cv-pt.html "assets/curriculum/Currículo - David Ambrozio.docx"
$CHROME --headless=new --virtual-time-budget=6000 --dump-dom "http://127.0.0.1:8080/resume/?lang=en" > /tmp/cv-en.html
python3 resume/make_docx.py /tmp/cv-en.html "assets/curriculum/Resume - David Ambrozio.docx"
```
