from summarizer import Summarizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import argparse
import logging

# Suppress logging messages from Transformers library
logging.getLogger("transformers").setLevel(logging.ERROR)

# Function to summarize text using BERT
# Function to summarize text using BERT
def bert_summarize(text, ratio=None, num_sentences=None):
    model = Summarizer()
    result = None  # Initialize result variable
    if ratio:
        result = model(text, ratio=ratio)
    elif num_sentences:
        result = model(text, num_sentences=num_sentences)
    return result

# Function to calculate cosine similarity
def calculate_cosine_similarity(text1, text2):
    vectorizer = CountVectorizer().fit_transform([text1, text2])
    vectors = vectorizer.toarray()
    return cosine_similarity([vectors[0]], [vectors[1]])[0][0]

def main():
    parser = argparse.ArgumentParser(description="Text summarizer")
    parser.add_argument("text", type=str, help="Input text to summarize")
    args = parser.parse_args()

    input_text = args.text
    summary = bert_summarize(input_text,ratio=0.2,num_sentences=3)
    
    print("BERT Summary:")
    print(summary)
    cosine_similarity_score = calculate_cosine_similarity(input_text, summary)
    print("\nCosine Similarity between Original Text and BERT Summary:", cosine_similarity_score)

if __name__ == "__main__":
    main()
