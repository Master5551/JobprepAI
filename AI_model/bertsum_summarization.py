from summarizer import Summarizer
import nltk

nltk.download('punkt')

def bertsum_summarization(text, num_sentences=3):
    """
    Perform extractive summarization using BertSum.
    
    Parameters:
    - text (str): Input text for summarization.
    - num_sentences (int): Number of sentences in the final summary.
    
    Returns:
    - summary (str): Extracted summary.
    """
    model = Summarizer('bert-base-uncased')  # Specify the BERT model to use

    # Tokenize and preprocess sentences
    sentences = nltk.sent_tokenize(text)

    # Join the sentences to form the input for BertSum
    input_text = ' '.join(sentences)

    # Generate summary using BertSum
    bertsum_summary = model(input_text, min_length=num_sentences, max_length=num_sentences)

    return bertsum_summary

# Example usage:
input_text = """
The DBMS manages the data; the database engine allows data to be accessed, locked and modified; and the database schema defines the database's logical structure. These three foundational elements help provide concurrency, security, data integrity and uniform data administration procedures. The DBMS supports many typical database administration tasks, including change management, performance monitoring and tuning, security, and backup and recovery. Most database management systems are also responsible for automated rollbacks and restarts as well as logging and auditing of activity in databases and the applications that access them.
"""

summary = bertsum_summarization(input_text, num_sentences=1)
print("BertSum Summary:")
print(summary)
try:
    bertsum_summary = model(input_text, min_length=num_sentences, max_length=num_sentences)
except Exception as e:
    print("Error during summarization:", e)
