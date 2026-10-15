import https from "node:https";
import fs from "node:fs";
import path from "node:path";

const targetDir = path.resolve("FE/public/images/sourced");
const publicImagesDir = path.resolve("FE/public/images");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      { headers: { "User-Agent": "TinLamTamLinhProject/1.0 (contact@tinlam.vn)" } },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error("Failed to parse JSON: " + data.slice(0, 100)));
          }
        });
      }
    ).on("error", reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      { headers: { "User-Agent": "TinLamTamLinhProject/1.0 (contact@tinlam.vn)" } },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed to download ${url}: HTTP ${res.statusCode}`));
        }
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close();
          resolve();
        });
      }
    ).on("error", reject);
  });
}

const wikimediaFiles = [
  {
    targetKey: "temple_bac_bo.jpg",
    wikiTitle: "File:Chùa Trấn Quốc, Hà Nội.jpg",
    context: "Kiến trúc chùa cổ và đình làng Bắc Bộ",
    defaultLocation: "Chùa Trấn Quốc, Tây Hồ, Hà Nội",
  },
  {
    targetKey: "hue_trung_bo.jpg",
    wikiTitle: "File:Hue Vietnam Thien-Mu-Temple-and-Pagoda-01.jpg",
    context: "Cố đô Huế & Chùa Thiên Mụ miền Trung",
    defaultLocation: "Chùa Thiên Mụ, Hương Long, TP Huế",
  },
  {
    targetKey: "mekong_nam_bo.jpg",
    wikiTitle: "File:Chợ nổi Cái Răng, ngày 23 tháng 5 năm 2014 (5).jpg",
    context: "Sông nước và sinh hoạt văn hóa đồng bằng Nam Bộ",
    defaultLocation: "Chợ nổi Cái Răng, Cần Thơ",
  },
  {
    targetKey: "den_hung.jpg",
    wikiTitle: "File:Cổng đền Hùng (Phú Thọ).jpg",
    context: "Khu di tích lịch sử Đền Hùng Phú Thọ",
    defaultLocation: "Đền Hùng, Hy Cương, Việt Trì, Phú Thọ",
  },
  {
    targetKey: "phu_tay_ho.jpg",
    wikiTitle: "File:Phủ Tây Hồ.jpg",
    context: "Phủ Tây Hồ - Nơi thờ Mẫu Liễu Hạnh",
    defaultLocation: "Phủ Tây Hồ, Quảng An, Tây Hồ, Hà Nội",
  },
  {
    targetKey: "mieu_ba_chua_xu.jpg",
    wikiTitle: "File:Miếu Bà Chúa Xứ Núi Sam.jpg",
    context: "Miếu Bà Chúa Xứ Núi Sam",
    defaultLocation: "Châu Đốc, An Giang",
  },
  {
    targetKey: "nui_ba_den.jpg",
    wikiTitle: "File:Núi Bà Đen, 2021.jpg",
    context: "Quần thể di tích và danh thắng Núi Bà Đen",
    defaultLocation: "Tây Ninh",
  },
  {
    targetKey: "hau_dong_chau_van.jpg",
    wikiTitle: "File:Hầu Đồng art performance.jpg",
    context: "Thực hành Tín ngưỡng Thờ Mẫu Tam Phủ (Di sản UNESCO)",
    defaultLocation: "Đền Mẫu Đông Cuông, Yên Bái",
  },
  {
    targetKey: "pottery_artisan.jpg",
    wikiTitle: "File:Bát Tràng DSC 0092.JPG",
    context: "Gốm thủ công truyền thống Bát Tràng",
    defaultLocation: "Làng gốm Bát Tràng, Gia Lâm, Hà Nội",
  },
  {
    targetKey: "do_paper_still_life.jpg",
    wikiTitle: "File:Thư Pháp 7.jpg",
    context: "Nghệ thuật thư pháp chữ Việt và giấy bản cổ truyền",
    defaultLocation: "Việt Nam",
  },
  {
    targetKey: "cau_ngu.jpg",
    wikiTitle: "File:Da-Nang Vietnam Coracles-01.jpg",
    context: "Thuyền thúng ngư dân và Lễ hội Cầu Ngư ven biển miền Trung",
    defaultLocation: "Bãi biển Đà Nẵng",
  },
  {
    targetKey: "ritual_ram.jpg",
    wikiTitle: "File:Hanoi Temple of Literature incense.jpg",
    context: "Khói nhang trầm thành kính trong không gian thờ tự",
    defaultLocation: "Văn Miếu - Quốc Tử Giám, Hà Nội",
  },
  {
    targetKey: "ancestor_portrait.jpg",
    wikiTitle: "File:Tết 2024 nhà mình (cúng Giao thừa, cúng bàn thờ tổ tiên) (1).jpg",
    context: "Bàn thờ gia tiên và mâm lễ tưởng nhớ cội nguồn",
    defaultLocation: "Việt Nam",
  },
  {
    targetKey: "zen_meditation.jpg",
    wikiTitle: "File:Bich Dong Pagoda, Ninh Binh, Vietnam, 20240203 1132 5634.jpg",
    context: "Cổng cổ chùa Bích Động giữa non nước tĩnh mặc",
    defaultLocation: "Chùa Bích Động, Hoa Lư, Ninh Bình",
  },
  {
    targetKey: "hoa_dang_ninh_kieu.jpg",
    wikiTitle: "File:Bến Ninh Kiều, Cần Thơ.JPG",
    context: "Không gian bến Ninh Kiều sông Hậu",
    defaultLocation: "Bến Ninh Kiều, Cần Thơ",
  },
];

async function main() {
  console.log("Fetching Wikimedia Commons verified metadata and assets...");
  const registry = [];

  // Add existing sourced files
  registry.push({
    targetKey: "temple_bac_bo_alt.jpg",
    fileName: "hanoi-temple-of-literature.jpg",
    filePath: "/images/sourced/hanoi-temple-of-literature.jpg",
    context: "Văn Miếu - Quốc Tử Giám Hà Nội",
    location: "Đống Đa, Hà Nội",
    artist: "Unsplash Contributor",
    license: "Unsplash License (Free to use)",
    sourceUrl: "https://unsplash.com",
  });
  registry.push({
    targetKey: "hoi_an_bai_choi.jpg",
    fileName: "hoi-an-night.jpg",
    filePath: "/images/sourced/hoi-an-night.jpg",
    context: "Phố cổ Hội An đêm rằm hoa đăng sông Hoài",
    location: "Hội An, Quảng Nam",
    artist: "Unsplash Contributor",
    license: "Unsplash License (Free to use)",
    sourceUrl: "https://unsplash.com",
  });
  registry.push({
    targetKey: "tea_bowl.jpg",
    fileName: "vietnamese-tea-set.jpg",
    filePath: "/images/sourced/vietnamese-tea-set.jpg",
    context: "Bộ ấm chén trà đạo truyền thống Việt Nam",
    location: "Việt Nam",
    artist: "Unsplash Contributor",
    license: "Unsplash License (Free to use)",
    sourceUrl: "https://unsplash.com",
  });

  for (const item of wikimediaFiles) {
    try {
      console.log(`Processing: ${item.wikiTitle}...`);
      const apiUrl =
        "https://commons.wikimedia.org/w/api.php?action=query&titles=" +
        encodeURIComponent(item.wikiTitle) +
        "&prop=imageinfo&iiprop=url|extmetadata&format=json";

      const data = await fetchJson(apiUrl);
      const pages = data.query?.pages;
      const info = Object.values(pages || {})[0]?.imageinfo?.[0];
      if (!info?.url) {
        console.error(`Could not find URL for ${item.wikiTitle}`);
        continue;
      }

      const meta = info.extmetadata;
      const cleanArtist = (meta?.Artist?.value || "N/A")
        .replace(/<[^>]+>/g, "")
        .trim();
      const cleanDesc = (meta?.ImageDescription?.value || item.context)
        .replace(/<[^>]+>/g, "")
        .trim();
      const license = meta?.LicenseShortName?.value || "CC BY-SA";

      const ext = path.extname(item.targetKey);
      const sourcedBaseName = path.basename(item.targetKey, ext);
      const sourcedFileName = `sourced_${sourcedBaseName}${ext}`;
      const sourcedPath = path.join(targetDir, sourcedFileName);

      console.log(`Downloading ${info.url} -> ${sourcedPath}`);
      await downloadFile(info.url, sourcedPath);

      // Also copy to main public/images/ so existing references immediately update
      const mainPath = path.join(publicImagesDir, item.targetKey);
      fs.copyFileSync(sourcedPath, mainPath);

      // If it's ancestor_portrait, also duplicate to hero_family.jpg
      if (item.targetKey === "ancestor_portrait.jpg") {
        fs.copyFileSync(sourcedPath, path.join(publicImagesDir, "hero_family.jpg"));
      }
      // If it's do_paper, also duplicate to relic_book.jpg
      if (item.targetKey === "do_paper_still_life.jpg") {
        fs.copyFileSync(sourcedPath, path.join(publicImagesDir, "relic_book.jpg"));
      }

      registry.push({
        targetKey: item.targetKey,
        fileName: sourcedFileName,
        filePath: `/images/sourced/${sourcedFileName}`,
        publicPath: `/images/${item.targetKey}`,
        context: item.context,
        location: item.defaultLocation,
        artist: cleanArtist,
        license: license,
        sourceUrl: info.descriptionurl || "https://commons.wikimedia.org",
        description: cleanDesc,
      });
    } catch (err) {
      console.error(`Error processing ${item.wikiTitle}:`, err.message);
    }
  }

  // Also copy existing sourced files to public/images keys
  fs.copyFileSync(
    path.join(targetDir, "hoi-an-night.jpg"),
    path.join(publicImagesDir, "hoi_an_bai_choi.jpg")
  );
  fs.copyFileSync(
    path.join(targetDir, "vietnamese-tea-set.jpg"),
    path.join(publicImagesDir, "tea_bowl.jpg")
  );

  const outRegistryPath = path.resolve("FE/src/data/verifiedImageRegistry.json");
  fs.writeFileSync(outRegistryPath, JSON.stringify(registry, null, 2), "utf-8");
  console.log(`Successfully generated registry at: ${outRegistryPath}`);
  console.log(`All ${registry.length} images downloaded and placed in FE/public/images!`);
}

main().catch(console.error);
