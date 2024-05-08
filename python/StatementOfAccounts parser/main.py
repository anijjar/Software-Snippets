import pdfquery
from secret import secrets

# Read pdf file
pdf = pdfquery.PDFQuery(secrets.get('FILE_LOCATION'))
pdf.load()

pdf.tree.write("sales.xml", pretty_print = True)

