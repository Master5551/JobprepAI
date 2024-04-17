import re
import string
import nltk
nltk.download('wordnet')
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer, WordNetLemmatizer

def text_preprocessing(text):
    # Removing punctuations
    # remove all characters that are not alphanumeric or whitespace from the text.
    text = re.sub(r'[^\w\s]', '', text)
    
    # Removing URLs
    text = re.sub(r'http\S+', '', text)
    
    # Lower casing
    text = text.lower()
    
    # Tokenization
    tokens = word_tokenize(text)
    
    # Removing stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]
    
    # Stemming
    stemmer = PorterStemmer()
    tokens = [stemmer.stem(word) for word in tokens]
    
    # Lemmatization
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    
    # Join tokens back into a single string
    preprocessed_text = ' '.join(tokens)
    
    return preprocessed_text

text = "Text preprocessing involves cleaning and preparing text data for further analysis or processing. Visit us at http://example.com."

preprocessed_text = text_preprocessing(text)
print("Original text:")
print(text)
print("\nPreprocessed text:")
print(preprocessed_text)
