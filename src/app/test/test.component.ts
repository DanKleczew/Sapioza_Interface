import {Component} from '@angular/core';
import {ButtonComponent} from "../main/widgets/buttons/button/button.component";
import {LoadingComponent} from "../main/widgets/loading/loading.component";
import {BannerService} from "../Services/banner.service";
import {BannerType} from "../Constantes/banner-type";
import {Router} from "@angular/router";
import {PaperMetaData} from "../Interfaces/paper-meta-data";
import {FilteredPaperMetaData} from "../Interfaces/filtered-paper-meta-data";
import {PaperListComponent} from "../main/widgets/paper-list/paper-list.component";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ButtonComponent, LoadingComponent, PaperListComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  constructor(private bannerService: BannerService, private router: Router) {
  }

  cacherBanner(){
    this.bannerService.hideBanner();
    //this.bannerService.bannerLifeCycle();
  }

  afficherBanner(){
    this.bannerService.showBanner("Message de la bannière", BannerType.ERROR);
    //this.router.navigate(['/']);
  }

  protected papersMetaData : FilteredPaperMetaData[] = [
      {
        "paperId": 85,
        "queriedPaperInfosDTO": {
          "paperDTO": {
            "DOI": "BB",
            "abstract_": "An analysis of modern art movements.",
            "authorId": 203,
            "comments": ["Interesting insights!", "Needs more references."],
            "dislikes": 1,
            "field": "ART",
            "keywords": "modernism, painting, sculpture",
            "likes": 5,
            "publicationDate": "2024-12-15",
            "publishedIn": "Art Journal",
            "title": "Exploring Modern Art"
          },
          "userInfoDTO": {
            "email": "Alice.Martin@etu.univ-lyon2.fr",
            "firstName": "Alice",
            "id": 203,
            "lastName": "Martin"
          }
        }
      },
      {
        "paperId": 86,
        "queriedPaperInfosDTO": {
          "paperDTO": {
            "DOI": "CC",
            "abstract_": "Study on AI ethics in healthcare applications.",
            "authorId": 204,
            "comments": ["Very informative!", "Ethical issues well addressed."],
            "dislikes": 0,
            "field": "CS",
            "keywords": "AI, ethics, healthcare",
            "likes": 12,
            "publicationDate": "2025-01-10",
            "publishedIn": "AI Ethics Review",
            "title": "The Ethical Dilemmas of AI in Medicine"
          },
          "userInfoDTO": {
            "email": "Marc.Dupont@etu.univ-toulouse.fr",
            "firstName": "Marc",
            "id": 204,
            "lastName": "Dupont"
          }
        }
      },
      {
        "paperId": 87,
        "queriedPaperInfosDTO": {
          "paperDTO": {
            "DOI": "DD",
            "abstract_": "The impact of social media on mental health.",
            "authorId": 205,
            "comments": ["Needs more data analysis."],
            "dislikes": 3,
            "field": "PSY",
            "keywords": "social media, psychology, mental health",
            "likes": 8,
            "publicationDate": "2024-11-20",
            "publishedIn": "Psychology Today",
            "title": "Social Media and Its Psychological Effects"

          },
          "userInfoDTO": {
            "email": "Emma.Leclerc@etu.univ-montpellier.fr",
            "firstName": "Emma",
            "id": 205,
            "lastName": "Leclerc"
          }
        }
      },
      {
        "paperId": 88,
        "queriedPaperInfosDTO": {
          "paperDTO": {
            "DOI": "EE",
            "abstract_": "A historical review of the French Revolution.",
            "authorId": 206,
            "comments": ["Great historical perspective!", "Very detailed."],
            "dislikes": 0,
            "field": "HIST",
            "keywords": "French Revolution, history, politics",
            "likes": 15,
            "publicationDate": "2023-09-01",
            "publishedIn": "Historical Review",
            "title": "Revolution and Change: France 1789-1799"

          },
          "userInfoDTO": {
            "email": "Jean.Robert@etu.univ-paris1.fr",
            "firstName": "Jean",
            "id": 206,
            "lastName": "Robert"
          }
        }
      },
      {
        "paperId": 89,
        "queriedPaperInfosDTO": {
          "paperDTO": {
            "DOI": "FF",
            "abstract_": "Quantum computing and its future applications.",
            "authorId": 207,
            "comments": ["Difficult to understand for beginners."],
            "dislikes": 2,
            "field": "PHYS",
            "keywords": "quantum computing, physics, technology",
            "likes": 10,
            "publicationDate": "2024-07-12",
            "publishedIn": "Physics Today",
            "title": "The Future of Quantum Computing"

          },
          "userInfoDTO": {
            "email": "David.Moreau@etu.univ-lyon1.fr",
            "firstName": "David",
            "id": 207,
            "lastName": "Moreau"
          }
        }
      },
      {
        "paperId": 90,
        "queriedPaperInfosDTO": {
          "paperDTO": {
            "DOI": "GG",
            "abstract_": "Climate change and its effects on biodiversity.",
            "authorId": 208,
            "comments": ["Important topic!", "Needs more regional case studies."],
            "dislikes": 1,
            "field": "ENV",
            "keywords": "climate change, biodiversity, environment",
            "likes": 20,
            "publicationDate": "2025-01-25",
            "publishedIn": "Environmental Research",
            "title": "Biodiversity in the Age of Climate Change"
          },
          "userInfoDTO": {
            "email": "Sophie.Bernard@etu.univ-rennes.fr",
            "firstName": "Sophie",
            "id": 208,
            "lastName": "Bernard"
          }
        }
      },
      {
        "paperId": 91,
        "queriedPaperInfosDTO": {
          "paperDTO": {
            "DOI": "HH",
            "abstract_": "An economic analysis of cryptocurrency trends.",
            "authorId": 209,
            "comments": ["Clear explanations!", "Good statistical approach."],
            "dislikes": 0,
            "field": "ECON",
            "keywords": "cryptocurrency, finance, economy",
            "likes": 18,
            "publicationDate": "2024-06-30",
            "publishedIn": "Economic Journal",
            "title": "The Rise and Fall of Cryptocurrencies"

          },
          "userInfoDTO": {
            "email": "Paul.Durand@etu.univ-bordeaux.fr",
            "firstName": "Paul",
            "id": 209,
            "lastName": "Durand"
          }
        }
      },
      {
        "paperId": 92,
        "queriedPaperInfosDTO": {
          "paperDTO": {
            "DOI": "II",
            "abstract_": "The role of genetics in personalized medicine.",
            "authorId": 210,
            "comments": ["Promising research!", "Well written."],
            "dislikes": 0,
            "field": "MED",
            "keywords": "genetics, personalized medicine, health",
            "likes": 25,
            "publicationDate": "2024-08-22",
            "publishedIn": "Medical Research",
            "title": "Genetics and the Future of Personalized Healthcare"

          },
          "userInfoDTO": {
            "email": "Clara.Perrin@etu.univ-strasbourg.fr",
            "firstName": "Clara",
            "id": 210,
            "lastName": "Perrin"
          }
        }
      }
    ];
}
