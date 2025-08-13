import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const SEOKeywords = () => {
  const { language } = useLanguage();

  const keywords = {
    fr: [
      'coran gratuit', 'quran gratuit', 'islam gratuit', 'livre islam gratuit',
      'coran en ligne', 'lire coran gratuitement', 'quran français',
      'coran complet gratuit', 'sourate gratuite', 'récitation coran',
      'heure prière gratuit', 'horaire prière islam', 'qibla direction',
      'régime islamique', 'médecine prophétique', 'nutrition halal',
      'bien-être musulman', 'santé selon islam', 'alimentation sunnah',
      'jeûne islamique', 'ramadan nutrition', 'régime ramadan',
      'compléments alimentaires halal', 'vitamines halal', 'probiotiques halal',
      'miel prophétique', 'graines de nigelle', 'dattes medjoul',
      'hijama thérapie', 'soins naturels islam', 'phytothérapie islamique',
      'application islam', 'app musulman', 'outil islam gratuit',
      'calculateur calorie halal', 'tracker nutrition islam',
      'assistant ia islam', 'chatbot musulman', 'conseil islamique'
    ],
    ar: [
      'قرآن مجاني', 'كتاب الله مجاني', 'إسلام مجاني', 'قراءة قرآن',
      'قرآن كريم اون لاين', 'تلاوة مجانية', 'سورة مجانية',
      'أوقات الصلاة مجاني', 'مواقيت الصلاة', 'اتجاه القبلة',
      'نظام غذائي إسلامي', 'الطب النبوي', 'تغذية حلال',
      'رفاهية المسلم', 'صحة حسب الإسلام', 'تغذية السنة',
      'صيام إسلامي', 'تغذية رمضان', 'نظام رمضان',
      'مكملات غذائية حلال', 'فيتامينات حلال', 'بروبيوتيك حلال',
      'عسل نبوي', 'حبة البركة', 'تمر مجهول',
      'حجامة علاج', 'علاج طبيعي إسلام', 'علاج بالنباتات',
      'تطبيق إسلامي', 'أبلكيشن مسلم', 'أداة إسلام مجانية',
      'حاسبة سعرات حلال', 'متتبع تغذية إسلامي',
      'مساعد ذكي إسلام', 'شات بوت مسلم', 'استشارة إسلامية'
    ],
    tr: [
      'ücretsiz kuran', 'bedava kuran', 'ücretsiz islam', 'kuran okuma',
      'online kuran', 'ücretsiz tilawet', 'sure okuma',
      'namaz vakitleri ücretsiz', 'ezan vakti', 'kıble yönü',
      'islamî beslenme', 'peygamber tıbbı', 'helal beslenme',
      'müslüman sağlık', 'islami sağlık', 'sünnet beslenme',
      'islamî oruç', 'ramazan beslenme', 'ramazan diyeti',
      'helal besin takviyesi', 'helal vitamin', 'helal probiyotik',
      'peygamber balı', 'çörek otu', 'medjoul hurma',
      'hacamat tedavi', 'doğal tedavi islam', 'bitkisel tedavi',
      'islam uygulaması', 'müslüman app', 'ücretsiz islam aracı',
      'helal kalori hesaplama', 'islam beslenme takip',
      'yapay zeka islam', 'müslüman chatbot', 'islamî danışmanlık'
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
      <h2>Coran gratuit en ligne - Lecture et récitation</h2>
      <p>
        Lisez le Coran gratuitement en ligne. Notre site offre une lecture complète du Quran 
        avec traduction française, récitation audio et navigation facile. Accédez librement 
        aux 114 sourates du livre saint de l'Islam. Coran gratuit, Quran en français, 
        récitation en arabe avec phonétique. Idéal pour apprendre et méditer.
      </p>
      
      <h3>Horaires de prière gratuits et direction Qibla</h3>
      <p>
        Trouvez facilement les horaires de prière pour votre ville. Calcul précis des 5 prières 
        quotidiennes selon votre localisation. Boussole Qibla gratuite pour vous orienter vers 
        la Mecque. Notifications automatiques pour ne jamais manquer une prière. 
        Application musulmane complète et gratuite.
      </p>
      
      <h3>Nutrition halal et bien-être islamique</h3>
      <p>
        Découvrez l'alimentation selon la tradition islamique. Régime alimentaire halal, 
        médecine prophétique, compléments nutritionnels certifiés. Calculateur de calories 
        adapté aux besoins musulmans. Suivi nutrition personnalisé selon les enseignements 
        de l'Islam. Graines de nigelle, miel, dattes Medjoul et autres superaliments halal.
      </p>
      
      <h3>Assistant IA islamique et conseils personnalisés</h3>
      <p>
        Chatbot intelligent spécialisé dans les questions islamiques. Conseils sur la religion, 
        la nutrition halal, les horaires de prière et le bien-être selon l'Islam. 
        Assistant virtuel musulman disponible 24h/24. Réponses conformes aux enseignements 
        islamiques et à la Sunnah du Prophète Mohamed (paix et bénédiction sur lui).
      </p>
      
      <p>
        Application gratuite tout-en-un pour les musulmans : Coran complet, horaires de prière, 
        nutrition halal, conseils santé selon l'Islam, direction Qibla, récitation audio, 
        traduction française. Outil indispensable pour pratiquer sa foi au quotidien. 
        Interface simple et intuitive, accessible sur tous appareils.
      </p>
    </div>
  );
};

export default SEOKeywords;