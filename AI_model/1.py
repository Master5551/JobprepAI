import argparse
import logging
from transformers import T5ForConditionalGeneration, T5Tokenizer

# Suppress logging messages from Transformers library
logging.getLogger("transformers").setLevel(logging.ERROR)

# Preload model and tokenizer
MODEL_NAME = "t5-small"
model = T5ForConditionalGeneration.from_pretrained(MODEL_NAME)
tokenizer = T5Tokenizer.from_pretrained(MODEL_NAME, legacy=False)

def summarize_text(input_text):
    # Tokenize the input text
    inputs = tokenizer.encode("summarize: " + input_text, return_tensors="pt", max_length=512, truncation=True)

    # Generate summary
    summary_ids = model.generate(inputs, max_length=150, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True)

    # Decode and return the summary
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

def main():
    parser = argparse.ArgumentParser(description="Text summarizer")
    parser.add_argument("text", nargs="+", type=str, help="Input text to summarize")
    args = parser.parse_args()

    input_text = " ".join(args.text)
    summary = summarize_text(input_text)
    print(summary)

if __name__ == "__main__":
    main()
