import "dotenv/config";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

type CategoryId = "anillos" | "collares" | "pulseras";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const IMAGES_BY_CATEGORY: Record<CategoryId, string> = {
  anillos: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400",
  collares: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400",
  pulseras: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400",
};

const CATALOG: Record<CategoryId, string[]> = {
  anillos: [
    "Anillo de Diamantes Étoile",
    "Anillo de Compromiso Promesa",
    "Alianza Eternity en Oro Blanco",
    "Anillo de Zafiro Real",
    "Anillo Halo de Esmeralda",
    "Banda de Bodas Classic Gold",
    "Anillo Solitario de Oro Rosa",
    "Anillo de Rubí Imperial",
    "Anillo de Perla de Tahití",
    "Anillo Trilogía de Diamantes",
    "Anillo Corona de Hojas",
    "Anillo Trenzado con Esmeralda",
    "Banda de Platino Pulido",
    "Anillo Gota de Amatista",
    "Anillo de Oro con Aguamarina",
    "Anillo de Diamantes Baguette",
    "Anillo Flor de Loto",
    "Anillo de Topacio Azul",
    "Anillo Chevron Delicado",
    "Anillo de Turmalina Rosa",
  ],
  collares: [
    "Collar Gota de Zafiro",
    "Gargantilla de Oro Amarillo 18k",
    "Collar Solitario de Diamante",
    "Collar de Perlas de Agua Dulce",
    "Pendiente Halo de Esmeralda",
    "Collar Medallón Vintage",
    "Gargantilla con Hilos de Oro",
    "Collar de Rubí en Forma de Corazón",
    "Collar de Aguamarina y Diamantes",
    "Collar Doble de Cadena de Oro",
    "Gargantilla de Platino Minimalista",
    "Collar de Amatista Ovalada",
    "Collar Flor de Lis en Oro Blanco",
    "Collar de Cuarzo Rosa Delicado",
    "Pendiente de Ópalo de Fuego",
    "Collar Barra Vertical de Diamantes",
    "Collar Infinito en Oro Rosa",
    "Collar Estrella del Norte",
    "Gargantilla de Diamantes de Pavé",
    "Collar de Jade Tallado",
  ],
  pulseras: [
    "Brazalete Tríada Dorada",
    "Pulsera Tenis de Diamantes",
    "Pulsera Eternity de Esmeraldas",
    "Brazalete Rígido de Oro Blanco",
    "Pulsera de Perlas Akoya",
    "Brazalete de Hojas Entrelazadas",
    "Pulsera de Eslabones Clásica",
    "Pulsera de Rubíes y Diamantes",
    "Brazalete Minimalista en Oro Rosa",
    "Pulsera de Zafiros de Pavé",
    "Pulsera Amistad de Hilo de Oro",
    "Brazalete de Platino con Textura",
    "Pulsera de Amatistas Redondas",
    "Brazalete de Filigrana Tradicional",
    "Pulsera de Cuarzo Rutilado",
    "Pulsera Ajustable con Diamante",
    "Brazalete Ancho de Oro Amarillo",
    "Pulsera de Ágata Negra",
    "Pulsera Cadena de Trigo",
    "Pulsera de Topacio y Plata",
  ],
};

function randomPrice(): number {
  return Number((400 + Math.random() * 2100).toFixed(2));
}

function randomStock(): number {
  return Math.floor(Math.random() * 12) + 3;
}

function createDescription(name: string, category: CategoryId): string {
  return `${name} es una pieza de alta joyería exclusiva de nuestra colección de ${category}. Ha sido elaborada a mano con metales nobles y gemas seleccionadas, ofreciendo un acabado pulido eterno y un diseño de lujo ideal para ocasiones trascendentales.`;
}

async function seed() {

  console.log("🔍 COMPROBACIÓN DE CREDENCIALES:", {
    apiKey: firebaseConfig.apiKey ? "Cargada con éxito ✔" : "FALTANTE ❌",
    projectId: firebaseConfig.projectId ? firebaseConfig.projectId : "FALTANTE ❌",
  });

  if (!firebaseConfig.projectId) {
    console.error("❌ ERROR: No se pudieron cargar las variables de entorno. Verifica que tu archivo .env esté en la raíz del proyecto.");
    process.exit(1);
  }

  const products = Object.entries(CATALOG).flatMap(([categoryId, names]) =>
    names.map((name) => ({
      name,
      nameLower: name.toLowerCase(),
      image: IMAGES_BY_CATEGORY[categoryId as CategoryId],
      description: createDescription(name, categoryId as CategoryId),
      price: randomPrice(),
      stock: randomStock(),
      categoryId: categoryId as CategoryId,
    })),
  );

  console.log(`🌱 Sembrando ${products.length} productos de joyería fina...\n`);

  for (const product of products) {
    const ref = doc(collection(db, "products"));
    await setDoc(ref, {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log(`✔ ${product.name}`);
  }

  console.log(`\n✅ ${products.length} productos de joyería creados correctamente.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Error al ejecutar el seeder:");
  console.error(error);
  process.exit(1);
});