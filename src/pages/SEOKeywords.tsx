import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const SEOKeywords = () => {
  const { language } = useLanguage();

  const keywords = {
    fr: [
      'livre islam', 'régime islamique', 'médecine prophétique', 'achat coran',
      'nutrition halal', 'bien-être musulman', 'santé selon islam',
      'alimentation sunnah', 'jeûne islamique', 'ramadan nutrition',
      'compléments alimentaires halal', 'thé islamique', 'miel prophétique',
      'graines de nigelle', 'dattes medjoul', 'eau de zamzam',
      'hijama thérapie', 'soins naturels islam', 'phytothérapie islamique',
      'vitamines halal', 'oméga 3 halal', 'probiotiques halal'
    ],
    ar: [
      'كتاب إسلامي', 'نظام غذائي إسلامي', 'الطب النبوي', 'شراء قرآن',
      'تغذية حلال', 'رفاهية المسلم', 'صحة حسب الإسلام',
      'تغذية السنة', 'صيام إسلامي', 'تغذية رمضان',
      'مكملات غذائية حلال', 'شاي إسلامي', 'عسل نبوي',
      'حبة البركة', 'تمر مجهول', 'ماء زمزم',
      'حجامة علاج', 'علاج طبيعي إسلام', 'علاج بالنباتات إسلامي',
      'فيتامينات حلال', 'أوميغا 3 حلال', 'بروبيوتيك حلال'
    ],
    tr: [
      'islam kitabı', 'islamî beslenme', 'peygamber tıbbı', 'kuran satın al',
      'helal beslenme', 'müslüman refahı', 'islama göre sağlık',
      'sünnet beslenme', 'islamî oruç', 'ramazan beslenme',
      'helal besin takviyesi', 'islamî çay', 'peygamber balı',
      'çörek otu', 'medjoul hurma', 'zemzem suyu',
      'hacamat tedavi', 'doğal tedavi islam', 'bitkisel tedavi islamî',
      'helal vitamin', 'helal omega 3', 'helal probiyotik'
    ]
  };

  return (
    <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }}>
      <h1>Keywords SEO</h1>
      <div>
        {keywords[language].map((keyword, index) => (
          <span key={index}>{keyword} </span>
        ))}
      </div>
      <p>
        Découvrez notre sélection de produits islamiques authentiques pour votre bien-être.
        Livres d'islam, corans de qualité, produits de médecine prophétique,
        compléments alimentaires halal certifiés, huiles essentielles naturelles,
        miels du monde entier, dattes premium, thés et tisanes islamiques.
        Suivez un régime alimentaire selon la tradition islamique avec nos conseils nutrition.
        Médecine alternative et thérapies naturelles conformes aux enseignements islamiques.
        Boutique en ligne spécialisée produits halal et bien-être musulman.
      </p>
    </div>
  );
};

export default SEOKeywords;