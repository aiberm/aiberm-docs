import docx

def read_docx(file_path):
    doc = docx.Document(file_path)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return '\n'.join(full_text)

try:
    content = read_docx(r'f:\VibeCoding\aiberm-docs\Trae Setup - 完善版（中英文）.docx')
    print(content)
except Exception as e:
    print(f"Error reading docx: {e}")
