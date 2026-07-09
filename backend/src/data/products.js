const products = [
  {
    "id": "1",
    "name": "Avena instantánea",
    "description": "Avena instantánea, ideal para desayunos o repostería.",
    "imageUrl": "https://culturaalimentaria.com.ar/wp-content/uploads/2016/05/avena.jpg",
    "category": "cereales",
    "presentations": [
      {
        "label": "1 kg",
        "finalPrice": 3000,
        "stock": 10,
        "supplierCost": 2000,
        "profitMargin": 50
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997729"
  },
  {
    "id": "2",
    "name": "Granola artesanal",
    "description": "Mezcla de cereales tostados con miel y frutas deshidratadas.",
    "imageUrl": "https://ivycocina.com/wp-content/uploads/2025/07/granola_web-scaled-e1752081819401.webp",
    "category": "cereales",
    "presentations": [
      {
        "label": "250 grs",
        "finalPrice": 2000,
        "stock": 10,
        "supplierCost": 1200,
        "profitMargin": 67
      },
      {
        "label": "500 grs",
        "finalPrice": 3850,
        "stock": 10,
        "supplierCost": 2310,
        "profitMargin": 67
      },
      {
        "label": "1 kg",
        "finalPrice": 7500,
        "stock": 10,
        "supplierCost": 4500,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997736"
  },
  {
    "id": "3",
    "name": "Copos de maíz sin azúcar",
    "description": "Copos de maíz naturales, sin aditivos ni azúcares añadidos.",
    "imageUrl": "https://st2.depositphotos.com/1364913/7108/i/450/depositphotos_71089115-stock-photo-heap-of-cornflakes-in-bowl.jpg",
    "category": "cereales",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 1400,
        "stock": 10,
        "supplierCost": 840,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 2600,
        "stock": 10,
        "supplierCost": 1560,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 5000,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997740"
  },
  {
    "id": "4",
    "name": "Cereal de quinoa pop (inflada)",
    "description": "Cereal de quinoa inflada, liviano y nutritivo, sin gluten.",
    "imageUrl": "https://cdn0.uncomo.com/es/posts/4/1/7/como_hacer_quinoa_inflada_50714_orig.jpg",
    "category": "cereales",
    "presentations": [
      {
        "label": "150 grs",
        "finalfinalPrice": 1900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67

      },
      {
        "label": "500 grs",
        "finalfinalPrice": 3600,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1 kg",
        "finalfinalPrice": 7000,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997742"
  },
  {
    "id": "5",
    "name": "Avena instantánea",
    "description": "Avena precocida, de rápida cocción, ideal para el desayuno.",
    "imageUrl": "https://culturaalimentaria.com.ar/wp-content/uploads/2016/05/avena.jpg",
    "category": "cereales",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 1300,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 2400,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 4400,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997743"
  },
  {
    "id": "6",
    "name": "Trigo burgol",
    "description": "Grano de trigo partido, ideal para tabule o guarniciones.",
    "imageUrl": "https://demivalle.cl/cdn/shop/products/burgol-grueso.jpg?v=1620574425",
    "category": "cereales",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 1000,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 1900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 3600,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997745"
  },
  {
    "id": "7",
    "name": "Mix cereales integrales",
    "description": "Combinación de avena, trigo y centeno integral.",
    "imageUrl": "https://www.vivamisalud.com/wp-content/uploads/2018/11/cerealesintegrales.jpg",
    "category": "cereales",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 1400,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 2500,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 4700,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997748"
  },
  {
    "id": "8",
    "name": "Cereal de arroz inflado",
    "description": "Cereal liviano de arroz, sin gluten ni conservantes.",
    "imageUrl": "https://st3.depositphotos.com/7040152/13932/i/450/depositphotos_139325602-stock-photo-puffed-rice-cereal.jpg",
    "category": "cereales",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 1100,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 2100,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 3900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997751"
  },
  {
    "id": "9",
    "name": "Harina de avena",
    "description": "Harina integral de avena, perfecta para panificados y repostería saludable.",
    "imageUrl": "https://tequierovegano.cl/wp-content/uploads/2025/05/HARINA-AVENA.jpg",
    "category": "cereales",
    "presentations": [
      {
        "label": "500gr",
        "finalPrice": 1700,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 3200,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997754"
  },
  {
    "id": "10",
    "name": "Cereal integral con miel",
    "description": "Cereal integral endulzado naturalmente con miel orgánica.",
    "imageUrl": "https://i.pinimg.com/564x/1b/27/36/1b2736ebfb058f55b2b1968b7299cba9.jpg",
    "category": "cereales",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 1600,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 2800,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 5200,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997756"
  },
  {
    "id": "11",
    "name": "Almendras non pareil",
    "description": "Almendras seleccionadas variedad non pareil, ricas en proteínas y grasas saludables.",
    "imageUrl": "https://agourmet.cl/cdn/shop/products/almendras-naturales.jpg?v=1622883483",
    "category": "frutos secos",
    "presentations": [
      {
        "label": "150 grs",
        "finalPrice": 4500,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500 grs",
        "finalPrice": 14700,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1 kg",
        "finalPrice": 29000,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997759"
  },
  {
    "id": "12",
    "name": "Nueces mariposa",
    "description": "Mitades de nuez pelada, perfectas para snacks o repostería.",
    "imageUrl": "https://cdn.pedix.app/XlNmmD6QeZdL9zUh9zTf/products/1718404505432.png?size=800x800",
    "category": "frutos secos",
    "presentations": [
      {
        "label": "100 grs",
        "finalPrice": 2300,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "300 grs",
        "finalPrice": 6800,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "700 grs",
        "finalPrice": 15500,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997761"
  },
  {
    "id": "13",
    "name": "Castañas de cajú tostadas",
    "description": "Castañas tostadas, de textura cremosa y sabor suave. Origen Brasil.",
    "imageUrl": "https://cdn.shopify.com/s/files/1/2964/0212/files/35_ba0927a1-95e3-4d4e-be4b-9a491e634284_480x480.png?v=1720186653",
    "category": "frutos secos",
    "presentations": [
      {
        "label": "150 grs",
        "finalPrice": 3500,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500 grs",
        "finalPrice": 10700,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1 kg",
        "finalPrice": 21000,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997763"
  },
  {
    "id": "14",
    "name": "Maní tostado sin sal",
    "description": "Maní natural tostado sin aditivos ni sal añadida.",
    "imageUrl": "https://agronuss.cl/wp-content/uploads/2023/11/mani-sin-sal.jpg",
    "category": "frutos secos",
    "presentations": [
      {
        "label": "150 grs",
        "finalPrice": 800,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500 grs",
        "finalPrice": 2100,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1 kg",
        "finalPrice": 4000,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997765"
  },
  {
    "id": "15",
    "name": "Maní tostado con sal",
    "description": "Maní natural tostado, con sal añadida.",
    "imageUrl": "https://paltareinachile.cl/cdn/shop/files/ManiTostadoSalado_540x.png?v=1745267041",
    "category": "frutos secos",
    "presentations": [
      {
        "label": "150 grs",
        "finalPrice": 800,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500 grs",
        "finalPrice": 2100,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1 kg",
        "finalPrice": 4000,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997767"
  },
  {
    "id": "16",
    "name": "Mix de frutos secos Power",
    "description": "Combinación equilibrada de almendras, nueces, pasas rubias, pasas negras y castañas.",
    "imageUrl": "https://images.ecestaticos.com/usFSSFoyYWFu8hh9GCe-lYa085Q=/117x0:1999x1411/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Faa8%2F26e%2F5f1%2Faa826e5f1d9b1c2efa3faf8b58688558.jpg",
    "category": "frutos secos",
    "presentations": [
      {
        "label": "150gr",
        "finalPrice": 2700,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 8200,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 16000,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997769"
  },
  {
    "id": "17",
    "name": "Pistachos con cáscara salados y tostados",
    "description": "Pistachos con sal, fuente de proteínas y antioxidantes.",
    "imageUrl": "https://nutrifoodgt.com/cdn/shop/files/pistacho2.jpg?v=1736207337&width=480",
    "category": "frutos secos",
    "presentations": [
      {
        "label": "150 grs",
        "finalPrice": 6500,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "300 grs",
        "finalPrice": 12900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997771"
  },
  {
    "id": "18",
    "name": "Nueces pecán",
    "description": "Nuez pecán argentina de sabor intenso y textura suave.",
    "imageUrl": "https://soycomocomo.es/media/2019/07/nous-pecanes.jpg",
    "category": "frutos secos",
    "presentations": [
      {
        "label": "200gr",
        "finalPrice": 3200,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 7100,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 12900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997772"
  },
  {
    "id": "19",
    "name": "Pasas de uva rubias",
    "description": "Pasas de uva rubias sultaninas sin semillas",
    "imageUrl": "https://hausnusse.cl/cdn/shop/files/16_cda16c03-3395-418b-9f55-5a6642ea07b2.png?v=1734700758&width=1445",
    "category": "frutos secos",
    "presentations": [
      {
        "label": "150 grs",
        "finalPrice": 1600,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500 grs",
        "finalPrice": 4900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1 kg",
        "finalPrice": 9500,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997774"
  },
  {
    "id": "20",
    "name": "Pasas de uva negras",
    "description": "Pasas sultaninas sin semillas",
    "imageUrl": "https://alfa-editores.com.mx/wp-content/uploads/2021/03/PASITAS-BOWL-MADERA-4-1200x642.jpg",
    "category": "frutos secos",
    "presentations": [
      {
        "label": "150 grs",
        "finalPrice": 1100,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500 grs",
        "finalPrice": 3400,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1 kg",
        "finalPrice": 6500,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997776"
  },
  {
    "id": "21",
    "name": "Semillas de chía",
    "description": "Fuente natural de omega 3, fibra y antioxidantes.",
    "imageUrl": "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/KJH5NYG5GZCUTN6OR7P4EO4U5I.jpg",
    "category": "semillas",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 3200,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 6200,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 12000,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997778"
  },
  {
    "id": "22",
    "name": "Semillas de girasol",
    "description": "Semillas peladas, tostadas y listas para consumir.",
    "imageUrl": "https://miserdiet.com.ar/wp-content/uploads/2022/08/c6d17744-637f-4683-b222-0931e91729b7.jpg",
    "category": "semillas",
    "presentations": [
      {
        "label": "200gr",
        "finalPrice": 1100,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 2500,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 4700,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997779"
  },
  {
    "id": "23",
    "name": "Semillas de lino",
    "description": "Semillas de lino dorado, fuente de fibra y omega 3.",
    "imageUrl": "https://tn.com.ar/resizer/v2/la-semilla-de-lino-tiene-muchos-nutrientes-foto-adobe-stock-L47MTEQ43RFXFKEV24SYTLXYB4.jpeg?auth=23afc94a6319a25c4245a4bf7324315d03cae63661be9d9413da6e49519dffdf&width=767",
    "category": "semillas",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 1600,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 3000,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997781"
  },
  {
    "id": "24",
    "name": "Sésamo integral",
    "description": "Semillas de sésamo integral, ideales para panes o ensaladas.",
    "imageUrl": "https://districonf.com.ar/wp-content/uploads/2021/04/semillas-de-sesamo-integral-100g4-fe686e001530c0f23e15716233061174-640-01.jpg",
    "category": "semillas",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 1100,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 2000,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 3800,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997783"
  },
  {
    "id": "25",
    "name": "Semillas de zapallo",
    "description": "Semillas con alto contenido de zinc y magnesio.",
    "imageUrl": "https://mejorconsalud.as.com/wp-content/uploads/2018/06/pipas-calabaza-semillas.jpg",
    "category": "semillas",
    "presentations": [
      {
        "label": "200gr",
        "finalPrice": 3900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 9200,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 18000,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997785"
  },
  {
    "id": "26",
    "name": "Mix de semillas",
    "description": "Combinación de chía, lino, sésamo, amaranto y girasol.",
    "imageUrl": "https://d22fxaf9t8d39k.cloudfront.net/c21c5f4e8d9c365ce433a47d9a117f2ecfad4def82291d21f764437afedd20e7284932.jpg",
    "category": "semillas",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 1500,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 2800,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 5400,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997787"
  },
  {
    "id": "27",
    "name": "Semillas de amapola",
    "description": "Pequeñas semillas negras, ideales para repostería.",
    "imageUrl": "https://cdn0.ecologiaverde.com/es/posts/3/3/4/que_son_las_semillas_de_amapola_4433_0_600.jpg",
    "category": "semillas",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 1400,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 2500,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 4700,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997789"
  },
  {
    "id": "28",
    "name": "Semillas de sésamo blanco",
    "description": "Sésamo blanco descascarado, rico en calcio y proteínas.",
    "imageUrl": "https://http2.mlstatic.com/D_NQ_NP_967060-MLA28559657155_112018-O.webp",
    "category": "semillas",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 1700,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 3200,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997790"
  },
  {
    "id": "29",
    "name": "Semillas de cáñamo",
    "description": "Semillas peladas, fuente de proteínas y grasas saludables.",
    "imageUrl": "https://i.blogs.es/5e7a86/istock-507146608/840_560.jpg",
    "category": "semillas",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 2100,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 3900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 7100,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997792"
  },
  {
    "id": "30",
    "name": "Semillas de mostaza",
    "description": "Semillas secas para condimentar o germinar.",
    "imageUrl": "https://cdn.unotv.com/images/2024/08/semillas-de-mostaza-jpg-140457-1024x576.jpeg",
    "category": "semillas",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 800,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 1500,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 2800,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997793"
  },
  {
    "id": "31",
    "name": "Miel pura de abejas Juricich",
    "description": "Miel 100% natural, sin aditivos ni conservantes.",
    "imageUrl": "https://boletindesalud.com.ar/wp-content/uploads/2020/09/miel-pura-abejas.jpg",
    "category": "productos envasados",
    "presentations": [
      {
        "label": "450 grs",
        "finalPrice": 4900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "950 grs",
        "finalPrice": 8600,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997795"
  },
  {
    "id": "32",
    "name": "Aceite de coco virgen",
    "description": "Aceite prensado en frío, ideal para cocinar o uso cosmético.",
    "imageUrl": "https://image.tuasaude.com/media/article/qw/90/como-usar-o-oleo-de-coco_15528.jpg?width=686&height=487",
    "category": "productos envasados",
    "presentations": [
      {
        "label": "250ml",
        "finalPrice": 2500,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500ml",
        "finalPrice": 4700,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1L",
        "finalPrice": 8900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997797"
  },
  {
    "id": "33",
    "name": "Mermelada de frutilla orgánica",
    "description": "Elaborada con fruta natural, sin conservantes ni colorantes.",
    "imageUrl": "https://recipes-specialingredientseurope.b-cdn.net/wp-content/uploads/2023/03/strawberry_jam-500x500.jpg",
    "category": "productos envasados",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 1900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "450gr",
        "finalPrice": 3300,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "800gr",
        "finalPrice": 6100,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997798"
  },
  {
    "id": "34",
    "name": "Aceite de oliva extra virgen",
    "description": "Aceite de primera prensada en frío, sabor intenso.",
    "imageUrl": "https://www.prensalibre.com/wp-content/uploads/2023/11/Para-que-sirve-el-aceite-de-oliva.jpeg?quality=52",
    "category": "productos envasados",
    "presentations": [
      {
        "label": "250ml",
        "finalPrice": 2900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500ml",
        "finalPrice": 5400,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1L",
        "finalPrice": 9800,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997800"
  },
  {
    "id": "35",
    "name": "Mantequilla de maní natural",
    "description": "Pasta 100% maní, sin azúcar ni aditivos.",
    "imageUrl": "https://media.cnn.com/api/v1/images/stellar/prod/cnne-445268-160705112136-04-fats-that-can-reduce-your-risk-of-dying-super-169.jpg?q=w_1110,c_fill",
    "category": "productos envasados",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 1900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 3500,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 6500,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997803"
  },
  {
    "id": "36",
    "name": "Dulce de leche artesanal",
    "description": "Dulce tradicional cocinado lentamente con azúcar orgánica.",
    "imageUrl": "https://www.canal12misiones.com/wp-content/uploads/2023/10/dulce-de-leche-1-1024x683-1.jpg",
    "category": "productos envasados",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 1600,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 2800,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 5200,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997804"
  },
  {
    "id": "37",
    "name": "Salsa de soja",
    "description": "Aceite aromático ideal para cocina oriental y ensaladas.",
    "imageUrl": "https://m.media-amazon.com/images/I/71iL838WqWL.jpg",
    "category": "productos envasados",
    "presentations": [
      {
        "label": "250ml",
        "finalPrice": 3100,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500ml",
        "finalPrice": 5600,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1L",
        "finalPrice": 10200,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997806"
  },
  {
    "id": "38",
    "name": "Vinagre de manzana orgánico",
    "description": "Fermentado naturalmente con la 'madre', sin pasteurizar.",
    "imageUrl": "https://comedera.com/wp-content/uploads/sites/9/2020/12/fresh-apple-juice-close-up-shot.jpg?w=4096",
    "category": "productos envasados",
    "presentations": [
      {
        "label": "250ml",
        "finalPrice": 1900,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500ml",
        "finalPrice": 3300,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1L",
        "finalPrice": 6100,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997808"
  },
  {
    "id": "39",
    "name": "Salsa de tomate casera",
    "description": "Tomates frescos cocinados lentamente con especias naturales.",
    "imageUrl": "https://www.aceitesdeolivadeespana.com/wp-content/uploads/2021/05/Salsa-de-tomate-casera.jpg",
    "category": "productos envasados",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 1200,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 2200,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 4100,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997809"
  },
  {
    "id": "40",
    "name": "Leche de almendras natural",
    "description": "Bebida vegetal sin aditivos, ideal para dietas veganas.",
    "imageUrl": "https://assets1.farmaciasanpablo.com.mx/landings/_blog/natural/20220929-lecheAlmendras/beneficios-de-leche-de-almendras.jpg",
    "category": "productos envasados",
    "presentations": [
      {
        "label": "250ml",
        "finalPrice": 1800,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500ml",
        "finalPrice": 3100,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1L",
        "finalPrice": 5800,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997811"
  },
  {
    "id": "41",
    "name": "Mijo perlado",
    "description": "Grano de mijo pelado, ideal para guisos, ensaladas y bowls.",
    "imageUrl": "https://img.freepik.com/fotos-premium/cerca-mijo-perlado-bajra-cuchara-madera_136354-4190.jpg",
    "category": "cereales",
    "presentations": [
      {
        "label": "250gr",
        "finalPrice": 1200,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "500gr",
        "finalPrice": 2300,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      },
      {
        "label": "1kg",
        "finalPrice": 4200,
        "stock": 10,
        "supplierCost": 3000,
        "profitMargin": 67
      }
    ],
    "createdAt": "2026-05-05T18:40:37.997813"
  }
]


export default products;