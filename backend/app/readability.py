import re
import textstat

def calculate_readability(text):
    # Using Flesch Reading Ease Score
    score = textstat.flesch_reading_ease(text)
    return round(score, 2)
