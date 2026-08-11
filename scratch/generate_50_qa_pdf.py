import os
import re
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, KeepTogether, PageBreak
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header
        self.drawString(54, 750, "JobIQ — Master 50 Technical Interview Questions & Answers")
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(54, 742, 558, 742)
        
        # Footer
        self.line(54, 50, 558, 50)
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 36, page_text)
        self.drawString(54, 36, "Confidential — JobIQ Technical Preparation Guide")
        self.restoreState()

def build_pdf():
    md_file_path = r"C:\Users\23pa1\.gemini\antigravity\brain\326b3291-0fa0-46d4-8257-b426fd28d464\JobIQ_50_Technical_Interview_Questions.md"
    pdf_file_path = r"C:\Users\23pa1\.gemini\antigravity\brain\326b3291-0fa0-46d4-8257-b426fd28d464\JobIQ_50_Technical_Interview_Questions.pdf"
    
    with open(md_file_path, "r", encoding="utf-8") as f:
        text = f.read()

    doc = SimpleDocTemplate(
        pdf_file_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=60,
        bottomMargin=60
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor("#1E1B4B"),
        spaceAfter=15
    )

    section_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=colors.HexColor("#4338CA"),
        spaceBefore=16,
        spaceAfter=8,
        keepWithNext=True
    )

    q_style = ParagraphStyle(
        'QuestionStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#0F172A"),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    a_style = ParagraphStyle(
        'AnswerStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#334155"),
        spaceAfter=8
    )

    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#0284C7"),
        backColor=colors.HexColor("#F8FAFC"),
        borderColor=colors.HexColor("#E2E8F0"),
        borderWidth=0.5,
        borderPadding=6,
        spaceBefore=4,
        spaceAfter=8
    )

    story = []

    # Title
    story.append(Paragraph("🎓 JobIQ — Master 50 Technical Interview Questions & Answers", title_style))
    story.append(Paragraph("<b>Complete Engineering Preparation Guide</b> for JobIQ Platform Architecture, FastAPI Backend, React 18 Frontend, PostgreSQL/Supabase Database, TF-IDF Machine Learning, Web Scrapers, Speech API, and Cloud DevOps.", a_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#6366F1"), spaceBefore=10, spaceAfter=15))

    lines = text.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue

        if line.startswith("## "):
            sec_text = line.replace("## ", "").strip()
            story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#E2E8F0"), spaceBefore=12, spaceAfter=8))
            story.append(Paragraph(sec_text, section_style))
            i += 1
        elif line.startswith("#### **Q") or line.startswith("### **Q"):
            q_text = re.sub(r'^[#\s\*]*', '', line).strip()
            q_text = q_text.replace("**", "")
            
            # Read subsequent lines for Answer and Code
            ans_lines = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith("#### **Q") and not lines[i].strip().startswith("### **Q") and not lines[i].strip().startswith("## "):
                curr = lines[i].strip()
                if curr:
                    ans_lines.append(curr)
                i += 1
            
            ans_raw = " ".join(ans_lines)
            
            # Process markdown bold / code in question and answer
            q_formatted = re.sub(r'Q(\d+):', r'<b>Q\1:</b>', q_text)
            
            # Convert markdown code blocks if any
            ans_formatted = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', ans_raw)
            ans_formatted = re.sub(r'`([^`]+)`', r'<font name="Courier" color="#0284C7">\1</font>', ans_formatted)
            ans_formatted = ans_formatted.replace("💡 Answer:", "<b>💡 Answer:</b>")

            q_flow = Paragraph(q_formatted, q_style)
            a_flow = Paragraph(ans_formatted, a_style)
            
            story.append(KeepTogether([q_flow, a_flow, Spacer(1, 4)]))
        else:
            i += 1

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF at: {pdf_file_path}")

if __name__ == "__main__":
    build_pdf()
