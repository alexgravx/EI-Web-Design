import os.path
import sqlite3
import numpy as np
from nltk.stem import WordNetLemmatizer
import collections
import re
from nltk.tokenize import word_tokenize


def article_word_tokenize(text):
    if type(text) != str:
        raise Exception("The function takes a string as input data")
    else:
        tokens = word_tokenize(text.lower())
        return tokens


def count_frequency(collection):
    L = []
    for i in collection:
        L += i
    L_dict = dict(collections.Counter(L))
    L_sorted = sorted(L_dict.items(), key=lambda t: t[1])[::-1]
    # print(L_dict)
    return L_sorted


def remove_stop_words(collection, stop_word):
    corpus_filtre = {}
    for i in range(len(collection)):
        corpus_filtre[i] = [k for k in collection[i] if k not in stop_word]
    return corpus_filtre


def collection_lemmatize(collection):
    lemmatized_collection = {}
    lemm = WordNetLemmatizer()  # initialisation d'un lemmatiseur
    for i in range(len(collection)):
        lemmatized_collection[i] = [lemm.lemmatize(k) for k in collection[i]]
    return lemmatized_collection


def extract_indexation_vocabulary(collection):
    vocabulary = set()
    for i in collection:
        for j in collection[i]:
            vocabulary.update([j])
    return vocabulary


def vocabulary_cleaning(vocabulary):
    clean_vocabulary = []
    for token in vocabulary:
        if re.match('[a-zA-Z]+', token) != None:
            clean_vocabulary.append(token.lower())
    return sorted(clean_vocabulary)


def clean_col(collection):
    collection_tokenize = []
    for document in collection:
        document_tokenize = article_word_tokenize(document)
        collection_tokenize.append(document_tokenize)
    # print(collection_tokenize)
    L_sorted = count_frequency(collection_tokenize)
    # print(L_sorted)
    stop_words = []
    for i in range(100):
        stop_words.append(L_sorted[i][0])
    # print(stop_words)
    collection_wosw = remove_stop_words(collection_tokenize, stop_words)
    # print(collection_wosw)
    collection_lem = collection_lemmatize(collection_wosw)
    return collection_lem


def create_vocab(collection_clean):
    vocab = extract_indexation_vocabulary(collection_clean)
    vocab_clean = vocabulary_cleaning(vocab)
    return vocab_clean


def vectorial_representation_doc(collection, doc, vocabulary):
    """vocabulary = list(vocab_clean)
    collection = collection_clean
    doc=index"""
    vector_doc = []
    for term in vocabulary:
        count_term = 0
        for token in collection[doc]:
            if token == term:
                count_term = count_term+1
        vector_doc.append(count_term)
    return vector_doc


def vectorial_representation_query(query, vocabulary):
    """vocabulary = list(vocab_clean)
    query=list(query_clean)"""
    query_vector = []
    for term in vocabulary:
        count_term = 0
        for token in query:
            if token == term:
                count_term = count_term+1
        query_vector.append(count_term)
    return query_vector


def get_score(dico_item):
    return dico_item[1]


def rank_document(collection, query, vocabulary):
    scores = {}
    for doc in collection.keys():
        # print(doc)
        #doc_value = collection[doc]
        doc_vec = np.array(vectorial_representation_doc(
            collection, doc, vocabulary))
        query_vec = np.array(vectorial_representation_query(query, vocabulary))
        scores[doc] = np.vdot(doc_vec, query_vec)
        # print(scores)
    ranks = sorted(scores.items(), key=get_score, reverse=True)
    return ranks


def final_rank(collection, query):
    """collection is a list of sentence
    query is a list of 1 sentence
    changer le nombre de stop words"""
    nb = len(collection)
    # print(collection+query)
    collection_clean = clean_col(collection+query)
    # print(collection_clean[979])
    # print(collection_clean)
    # collection_clean is a dict indexé par 0,1,2 suivant la position du document dans la première liste et donc la valeur est une liste de token clean
    query_clean = collection_clean[nb]
    # print(query_clean)
    vocabulary = list(create_vocab(collection_clean))
    # print(vocabulary)
    del collection_clean[nb]
    rank = rank_document(collection_clean, query_clean, vocabulary)
    # print(rank)
    return rank


try:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(BASE_DIR, "database.sqlite3")
# with sqlite3.connect(db_path) as db:

    sqliteConnection = sqlite3.connect(db_path)
    cursor = sqliteConnection.cursor()
    print("Database created and Successfully Connected to SQLite")

    sqlite_select_Query = "select id,overview from movie limit 1000"
    cursor.execute(sqlite_select_Query)
    record = cursor.fetchall()
    #print("SQLite Request Respond is ", record)
    cursor.close()

except sqlite3.Error as error:
    print("Error while connecting to sqlite", error)


# Pour 1000 movie, il mets 14s mais le résultat est satisfaisant
collection = [i[1] for i in record]
ranks = final_rank(collection, ['cook'])
print(ranks)
print(collection[ranks[0][0]])
# THE ID of the description
print(record[0][0]+ranks[0][0])
sqliteConnection.close()

"""
def build_inverted_index(collection):
    voc_clean = list(create_vocab(collection))
    collection_clean = clean_col(collection)
    inverted_index = {}
    for term in voc_clean:
        L = []
        for doc_clean in collection_clean:
            L.append(doc_clean.count(term))
        inverted_index[term] = L
    return inverted_index

# Transformation d'une requête texte en booléen


def query_pre_processing(query):
    processed_query = []
    for item in query.split():
        processed_query.append(item)
    return processed_query


def boolean_operator_processing(BoolOperator, term1, term2):
    result = []
    if BoolOperator == "AND":
        for a, b in zip(term1, term2):
            if a == 1 and b == 1:
                result.append(1)
            else:
                result.append(0)
    elif BoolOperator == "OR":
        for a, b in zip(term1, term2):
            if a == 0 and b == 0:
                result.append(0)
            else:
                result.append(1)
    elif BoolOperator == "NOT":
        for b in term1:
            if b == 1:
                result.append(0)
            else:
                result.append(1)
    return result
"""
