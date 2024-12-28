import requests

# Remplacez ceci par votre propre clé API obtenue via Bing Webmaster Tools
API_KEY = "b414a38e0bb0409a9a11f709e62935ef"

# Le fichier contenant les URLs à indexer
URL_FILE = "urls.txt"

# URL de l'API IndexNow de Bing
INDEXNOW_URL = "https://www.bing.com/indexnow"

# Fonction pour envoyer une URL à l'API de Bing
def index_url(url):
    payload = {
        'key': API_KEY,
        'url': url
    }
    
    try:
        response = requests.post(INDEXNOW_URL, data=payload)
        # Vérification du code de statut HTTP pour savoir si l'indexation a été acceptée
        if response.status_code == 200:
            print(f"[INFO] URL '{url}' indexée avec succès.")
        else:
            print(f"[WARNING] Échec de l'indexation pour l'URL '{url}' - Code de statut {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] Problème de connexion ou d'envoi pour l'URL '{url}': {e}")

# Lecture du fichier 'urls.txt' et envoi des URLs à l'API
def index_urls_from_file():
    try:
        with open(URL_FILE, 'r') as file:
            urls = file.readlines()
            for url in urls:
                url = url.strip()  # Retirer les espaces et les sauts de ligne
                if url:  # Vérifier si la ligne n'est pas vide
                    index_url(url)
    except FileNotFoundError:
        print(f"[ERROR] Le fichier '{URL_FILE}' n'a pas été trouvé.")
    except Exception as e:
        print(f"[ERROR] Une erreur s'est produite: {e}")

if __name__ == "__main__":
    index_urls_from_file()
