const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

// Inizializza Firebase Admin SDK
const serviceAccount = require("./desa-srl-firebase-adminsdk-nx1bx-bda453ec1c.json"); // Sostituisci con il tuo file di credenziali
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function generateSitemap() {
  const baseUrl = "https://ricambidesa.it"; // URL base del sito
  const sitemapPath = path.join(__dirname, "sitemap.xml"); // Percorso dove salvare la sitemap

  let urls = [];

  // Pagine statiche
  const staticUrls = [
    { loc: "/", priority: 1.0, changefreq: "daily" },
    { loc: "/negozio", priority: 0.9, changefreq: "daily" },
    { loc: "/private", priority: 0.5, changefreq: "monthly" },
    { loc: "/area_riservata", priority: 0.5, changefreq: "monthly" },
    { loc: "/contatti", priority: 0.6, changefreq: "monthly" },
  ];

  staticUrls.forEach((page) => {
    urls.push(
      `<url>
        <loc>${baseUrl}${page.loc}</loc>
        <priority>${page.priority}</priority>
        <changefreq>${page.changefreq}</changefreq>
      </url>`
    );
  });

  // Pagine dinamiche: articoli
  try {
    const articoliSnapshot = await db.collection("articoli").get();

    articoliSnapshot.forEach((doc) => {
      const articolo = doc.data().a; // Supponendo che gli articoli siano in un oggetto `a`
      if (articolo && articolo.nome && articolo.cod) {
        const nome = encodeURIComponent(articolo.nome.stringValue || articolo.nome);
        const codice = encodeURIComponent(articolo.cod.stringValue || articolo.cod);

        urls.push(
          `<url>
            <loc>${baseUrl}/articolo/${nome}/${codice}</loc>
            <priority>0.9</priority>
            <changefreq>daily</changefreq>
          </url>`
        );
      }
    });
  } catch (error) {
    console.error("Errore durante il recupero degli articoli:", error);
    return;
  }

  // Genera la sitemap
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join("\n")}
</urlset>`;

  // Salva la sitemap in un file
  fs.writeFileSync(sitemapPath, sitemapContent, "utf-8");
  console.log(`Sitemap generata con successo: ${sitemapPath}`);
}

// Esegui lo script
generateSitemap();
