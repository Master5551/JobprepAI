from sumy.summarizers.lsa import LsaSummarizer
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
import networkx as nx
from sklearn.feature_extraction.text import TfidfVectorizer
import nltk

nltk.download('punkt')

def summarize_with_lsa(technical_answer):
    """
    Summarize the technical answer using LSA Summarizer from sumy.
    """
    parser = PlaintextParser.from_string(technical_answer, Tokenizer("english"))
    lsa_summarizer = LsaSummarizer()
    summary_sentences = lsa_summarizer(parser.document, sentences_count=3)  # Increase sentences_count
    return ' '.join([str(sentence) for sentence in summary_sentences])

def summarize_with_textrank(technical_answer):
    """
    Summarize the technical answer using TextRank implementation using NetworkX.
    """
    sentences = technical_answer.split(". ")
    graph = nx.Graph()
    for sentence in sentences:
        for other_sentence in sentences:
            if sentence != other_sentence:
                similarity = len(set(sentence.split()) & set(other_sentence.split())) / (len(set(sentence.split())) + len(set(other_sentence.split())))
                graph.add_edge(sentence, other_sentence, weight=similarity)
    ranked_sentences = nx.pagerank(graph)
    summary_sentences = sorted(ranked_sentences, key=ranked_sentences.get, reverse=True)[:2]
    return ' '.join([str(sentence) for sentence in summary_sentences])


def summarize_with_tfidf(technical_answer):
    """
    Summarize the technical answer using TF-IDF based summarization.
    """
    tfidf_vectorizer = TfidfVectorizer(stop_words='english', max_features=10)  # Limit the number of features
    tfidf_matrix = tfidf_vectorizer.fit_transform([technical_answer])
    feature_names = tfidf_vectorizer.get_feature_names_out()
    top_indices = (-tfidf_matrix.toarray()[0]).argsort()[:5]  # Keep the top 5 features
    summary_terms = [feature_names[index] for index in top_indices]
    return summary_terms


# Sample technical answer text
technical_answer = """
Object-oriented programming (OOP) is a programming paradigm based on the concept of "objects", 
which can contain data, in the form of fields (often known as attributes), and code, in the form 
of procedures (often known as methods). In OOP, computer programs are designed by making them 
out of objects that interact with one another. Object-oriented programming languages include Java, 
C++, Python, and Ruby.
"""

# Perform summarization using each method
lsa_summary = summarize_with_lsa(technical_answer)
textrank_summary = summarize_with_textrank(technical_answer)
tfidf_summary = summarize_with_tfidf(technical_answer)

# Print summaries
print("Orignal Text : ")
print(technical_answer)
print("\nLSA Summarizer Summary:")
print(lsa_summary)
print("\nTextRank Summary:")
print(textrank_summary)
print("\nTF-IDF Summary:")
print(tfidf_summary)
