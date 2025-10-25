'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'th' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 翻译数据
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.changeCity': 'Change City',
    'nav.otherCities': 'Other Cities',
    'nav.back': 'Go Back',
    
    // Theme
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.toggle': 'Toggle theme',
    
    // Language
    'lang.english': 'English',
    'lang.thai': 'ไทย',
    'lang.chinese': '中文',
    'lang.select': 'Select language',
    
    // Common
    'common.loading': 'Loading...',
    'common.detecting': 'Detecting your location...',
    'common.error': 'Error',
    'common.tryAgain': 'Try Again',
    'common.comingSoon': 'Coming Soon!',
    'common.underDevelopment': 'Under Development',
    'common.developmentNotice': 'This city page is currently under development. We\'re working hard to bring you the best experience. Check back soon for updates!',
    
    // City pages
    'city.welcome': 'Welcome to',
    'city.quickActions': 'Quick Actions',
    'city.select': 'Select Your City',
    'city.selectDescription': 'Choose your city to get started with GoingTown',
    'city.nearby': 'Cities Near You',
    'city.allCities': 'All Available Cities',
    'city.nearbyCities': 'Nearby Cities',
    'city.distance': 'km away',
    'city.groupByCountry': 'Group by Country',
    'city.popularCities': 'Popular Cities',
    
    // City Names - English
    'city.bangkok': 'Bangkok',
    'city.chiang-mai': 'Chiang Mai',
    'city.chiang-rai': 'Chiang Rai',
    'city.phuket': 'Phuket',
    'city.pattaya': 'Pattaya',
    'city.krabi': 'Krabi',
    'city.koh-samui': 'Koh Samui',
    'city.koh-phangan': 'Koh Phangan',
    'city.koh-tao': 'Koh Tao',
    'city.ayutthaya': 'Ayutthaya',
    'city.sukhothai': 'Sukhothai',
    'city.kanchanaburi': 'Kanchanaburi',
    'city.hua-hin': 'Hua Hin',
    'city.cha-am': 'Cha-am',
    'city.khon-kaen': 'Khon Kaen',
    'city.udon-thani': 'Udon Thani',
    'city.nakhon-ratchasima': 'Nakhon Ratchasima',
    'city.ubon-ratchathani': 'Ubon Ratchathani',
    'city.hat-yai': 'Hat Yai',
    'city.surat-thani': 'Surat Thani',
    'city.nakhon-si-thammarat': 'Nakhon Si Thammarat',
    'city.trang': 'Trang',
    'city.krabi-town': 'Krabi Town',
    'city.ranong': 'Ranong',
    'city.chumphon': 'Chumphon',
    'city.mae-sai': 'Mae Sai',
    'city.singapore': 'Singapore',
    'city.kuala-lumpur': 'Kuala Lumpur',
    'city.jakarta': 'Jakarta',
    'city.manila': 'Manila',
    'city.ho-chi-minh': 'Ho Chi Minh City',
    'city.hanoi': 'Hanoi',
    'city.seoul': 'Seoul',
    'city.tokyo': 'Tokyo',
    'city.osaka': 'Osaka',
    'city.hong-kong': 'Hong Kong',
    'city.taipei': 'Taipei',
    'city.beijing': 'Beijing',
    'city.shanghai': 'Shanghai',
    'city.guangzhou': 'Guangzhou',
    'city.shenzhen': 'Shenzhen',
    'city.chengdu': 'Chengdu',
    'city.hangzhou': 'Hangzhou',
    'city.wuhan': 'Wuhan',
    'city.xian': 'Xi\'an',
    'city.nanjing': 'Nanjing',
    'city.tianjin': 'Tianjin',
    'city.chongqing': 'Chongqing',
    'city.suzhou': 'Suzhou',
    'city.dongguan': 'Dongguan',
    'city.foshan': 'Foshan',
    'city.qingdao': 'Qingdao',
    'city.dalian': 'Dalian',
    'city.ningbo': 'Ningbo',
    'city.xiamen': 'Xiamen',
    'city.changsha': 'Changsha',
    'city.zhengzhou': 'Zhengzhou',
    'city.jinan': 'Jinan',
    'city.harbin': 'Harbin',
    'city.shenyang': 'Shenyang',
    'city.kunming': 'Kunming',
    'city.nanchang': 'Nanchang',
    'city.fuzhou': 'Fuzhou',
    'city.shijiazhuang': 'Shijiazhuang',
    'city.taiyuan': 'Taiyuan',
    'city.hefei': 'Hefei',
    'city.nanning': 'Nanning',
    'city.guiyang': 'Guiyang',
    'city.lanzhou': 'Lanzhou',
    'city.urumqi': 'Urumqi',
    'city.hohhot': 'Hohhot',
    'city.yinchuan': 'Yinchuan',
    'city.xining': 'Xining',
    'city.lhasa': 'Lhasa',
    'city.sydney': 'Sydney',
    'city.melbourne': 'Melbourne',
    'city.london': 'London',
    'city.paris': 'Paris',
    'city.berlin': 'Berlin',
    'city.amsterdam': 'Amsterdam',
    'city.new-york': 'New York',
    'city.los-angeles': 'Los Angeles',
    'city.san-francisco': 'San Francisco',
    'city.toronto': 'Toronto',
    'city.vancouver': 'Vancouver',
    
    // Bangkok
    'bangkok.title': 'Bangkok',
    'bangkok.subtitle': 'Welcome to the City of Angels',
    'bangkok.subtitleThai': 'เมืองแห่งทูตสวรรค์',
    'bangkok.food': 'Local Food',
    'bangkok.foodDesc': 'Discover authentic Thai cuisine and street food experiences',
    'bangkok.temples': 'Temples & Culture',
    'bangkok.templesDesc': 'Explore ancient temples and rich cultural heritage',
    'bangkok.shopping': 'Shopping',
    'bangkok.shoppingDesc': 'From luxury malls to bustling markets',
    'bangkok.findFood': 'Find Food',
    'bangkok.transportation': 'Transportation',
    'bangkok.hotels': 'Hotels',
    'bangkok.attractions': 'Attractions',
    
    // Chiang Mai
    'chiangmai.title': 'Chiang Mai',
    'chiangmai.subtitle': 'The Rose of the North',
    'chiangmai.subtitleThai': 'ดอกกุหลาบแห่งภาคเหนือ',
    'chiangmai.temples': 'Temples & Culture',
    'chiangmai.templesDesc': 'Explore ancient temples and rich Lanna culture',
    'chiangmai.mountains': 'Mountains & Nature',
    'chiangmai.mountainsDesc': 'Trekking, waterfalls, and mountain adventures',
    'chiangmai.markets': 'Night Markets',
    'chiangmai.marketsDesc': 'Famous Sunday Walking Street and local crafts',
    'chiangmai.templesAction': 'Temples',
    'chiangmai.trekking': 'Trekking',
    'chiangmai.marketsAction': 'Markets',
    'chiangmai.food': 'Food',
    
    // Phuket
    'phuket.title': 'Phuket',
    'phuket.subtitle': 'The Pearl of the Andaman',
    'phuket.subtitleThai': 'ไข่มุกแห่งอันดามัน',
    'phuket.beaches': 'Beaches & Islands',
    'phuket.beachesDesc': 'Beautiful beaches and island hopping adventures',
    'phuket.water': 'Water Activities',
    'phuket.waterDesc': 'Diving, snorkeling, and water sports',
    'phuket.sunset': 'Sunset Views',
    'phuket.sunsetDesc': 'Stunning sunsets and romantic dining',
    'phuket.beachesAction': 'Beaches',
    'phuket.diving': 'Diving',
    'phuket.islandTours': 'Island Tours',
    'phuket.sunsetAction': 'Sunset',
    
    // Pattaya
    'pattaya.title': 'Pattaya',
    'pattaya.subtitle': 'The Beach City',
    'pattaya.subtitleThai': 'เมืองชายหาด',
    'pattaya.beach': 'Beach Activities',
    'pattaya.beachDesc': 'Water sports, beach bars, and relaxation',
    'pattaya.entertainment': 'Entertainment',
    'pattaya.entertainmentDesc': 'Shows, nightlife, and cultural performances',
    'pattaya.shopping': 'Shopping',
    'pattaya.shoppingDesc': 'Markets, malls, and local souvenirs',
    'pattaya.beachesAction': 'Beaches',
    'pattaya.shows': 'Shows',
    'pattaya.shoppingAction': 'Shopping',
    'pattaya.food': 'Food',
    
    // Mae Sai
    'maesai.title': 'Mae Sai',
    'maesai.subtitle': 'The Northern Border Town',
    'maesai.subtitleThai': 'เมืองชายแดนภาคเหนือ',
    'maesai.market': 'Border Market',
    'maesai.marketDesc': 'Cross-border shopping and local crafts',
    'maesai.mountains': 'Mountain Views',
    'maesai.mountainsDesc': 'Stunning mountain landscapes and nature',
    'maesai.culture': 'Local Culture',
    'maesai.cultureDesc': 'Hill tribe communities and traditions',
    'maesai.marketsAction': 'Markets',
    'maesai.nature': 'Nature',
    'maesai.cultureAction': 'Culture',
    'maesai.food': 'Food',
    'maesai.borderInfo': 'Border Information',
    'maesai.borderDesc': 'Mae Sai is Thailand\'s northernmost border town, connecting with Myanmar. The border crossing is open daily for day trips and shopping.',
  },
  th: {
    // Navigation
    'nav.home': 'หน้าแรก',
    'nav.changeCity': 'เปลี่ยนเมือง',
    'nav.otherCities': 'เมืองอื่นๆ',
    'nav.back': 'กลับ',
    
    // Theme
    'theme.light': 'สว่าง',
    'theme.dark': 'มืด',
    'theme.toggle': 'เปลี่ยนธีม',
    
    // Language
    'lang.english': 'English',
    'lang.thai': 'ไทย',
    'lang.chinese': '中文',
    'lang.select': 'เลือกภาษา',
    
    // Common
    'common.loading': 'กำลังโหลด...',
    'common.detecting': 'กำลังตรวจสอบตำแหน่งของคุณ...',
    'common.error': 'เกิดข้อผิดพลาด',
    'common.tryAgain': 'ลองใหม่',
    'common.comingSoon': 'เร็วๆ นี้!',
    'common.underDevelopment': 'กำลังพัฒนา',
    'common.developmentNotice': 'หน้านี้กำลังอยู่ในระหว่างการพัฒนา เรากำลังทำงานอย่างหนักเพื่อนำเสนอประสบการณ์ที่ดีที่สุดให้กับคุณ กรุณาติดตามข่าวสาร',
    
    // City pages
    'city.welcome': 'ยินดีต้อนรับสู่',
    'city.quickActions': 'การดำเนินการด่วน',
    'city.select': 'เลือกเมืองของคุณ',
    'city.selectDescription': 'เลือกเมืองของคุณเพื่อเริ่มต้นกับ GoingTown',
    'city.nearby': 'เมืองใกล้เคียง',
    'city.allCities': 'เมืองทั้งหมดที่มี',
    'city.nearbyCities': 'เมืองใกล้เคียง',
    'city.distance': 'กิโลเมตร',
    'city.groupByCountry': 'จัดกลุ่มตามประเทศ',
    'city.popularCities': 'เมืองยอดนิยม',
    
    // City Names - Thai
    'city.bangkok': 'กรุงเทพฯ',
    'city.chiang-mai': 'เชียงใหม่',
    'city.chiang-rai': 'เชียงราย',
    'city.phuket': 'ภูเก็ต',
    'city.pattaya': 'พัทยา',
    'city.krabi': 'กระบี่',
    'city.koh-samui': 'เกาะสมุย',
    'city.koh-phangan': 'เกาะพะงัน',
    'city.koh-tao': 'เกาะเต่า',
    'city.ayutthaya': 'อยุธยา',
    'city.sukhothai': 'สุโขทัย',
    'city.kanchanaburi': 'กาญจนบุรี',
    'city.hua-hin': 'หัวหิน',
    'city.cha-am': 'ชะอำ',
    'city.khon-kaen': 'ขอนแก่น',
    'city.udon-thani': 'อุดรธานี',
    'city.nakhon-ratchasima': 'นครราชสีมา',
    'city.ubon-ratchathani': 'อุบลราชธานี',
    'city.hat-yai': 'หาดใหญ่',
    'city.surat-thani': 'สุราษฎร์ธานี',
    'city.nakhon-si-thammarat': 'นครศรีธรรมราช',
    'city.trang': 'ตรัง',
    'city.krabi-town': 'เมืองกระบี่',
    'city.ranong': 'ระนอง',
    'city.chumphon': 'ชุมพร',
    'city.mae-sai': 'แม่สาย',
    'city.singapore': 'สิงคโปร์',
    'city.kuala-lumpur': 'กัวลาลัมเปอร์',
    'city.jakarta': 'จาการ์ตา',
    'city.manila': 'มะนิลา',
    'city.ho-chi-minh': 'โฮจิมินห์',
    'city.hanoi': 'ฮานอย',
    'city.seoul': 'โซล',
    'city.tokyo': 'โตเกียว',
    'city.osaka': 'โอซาก้า',
    'city.hong-kong': 'ฮ่องกง',
    'city.taipei': 'ไทเป',
    'city.beijing': 'ปักกิ่ง',
    'city.shanghai': 'เซี่ยงไฮ้',
    'city.guangzhou': 'กวางโจว',
    'city.shenzhen': 'เซินเจิ้น',
    'city.chengdu': 'เฉิงตู',
    'city.hangzhou': 'หางโจว',
    'city.wuhan': 'อู่ฮั่น',
    'city.xian': 'ซีอาน',
    'city.nanjing': 'หนานจิง',
    'city.tianjin': 'เทียนจิน',
    'city.chongqing': 'ฉงชิ่ง',
    'city.suzhou': 'ซูโจว',
    'city.dongguan': 'ตงกวน',
    'city.foshan': 'ฟอซาน',
    'city.qingdao': 'ชิงเต่า',
    'city.dalian': 'ต้าเหลียน',
    'city.ningbo': 'หนิงโป',
    'city.xiamen': 'เซี่ยเหมิน',
    'city.changsha': 'ฉางชา',
    'city.zhengzhou': 'เจิ้งโจว',
    'city.jinan': 'จีหนาน',
    'city.harbin': 'ฮาร์บิน',
    'city.shenyang': 'เสิ่นหยาง',
    'city.kunming': 'คุนหมิง',
    'city.nanchang': 'หนานชาง',
    'city.fuzhou': 'ฝูโจว',
    'city.shijiazhuang': 'ฉือเจียจวง',
    'city.taiyuan': 'ไท่หยวน',
    'city.hefei': 'เหอเฟย์',
    'city.nanning': 'หนานหนิง',
    'city.guiyang': 'กุ้ยหยาง',
    'city.lanzhou': 'หลานโจว',
    'city.urumqi': 'อูรูมูฉี',
    'city.hohhot': 'ฮูฮาโอเต',
    'city.yinchuan': 'ยินชวน',
    'city.xining': 'ซีหนิง',
    'city.lhasa': 'ลาซา',
    'city.sydney': 'ซิดนีย์',
    'city.melbourne': 'เมลเบิร์น',
    'city.london': 'ลอนดอน',
    'city.paris': 'ปารีส',
    'city.berlin': 'เบอร์ลิน',
    'city.amsterdam': 'อัมสเตอร์ดัม',
    'city.new-york': 'นิวยอร์ก',
    'city.los-angeles': 'ลอสแอนเจลิส',
    'city.san-francisco': 'ซานฟรานซิสโก',
    'city.toronto': 'โตรอนโต',
    'city.vancouver': 'แวนคูเวอร์',
    
    // Bangkok
    'bangkok.title': 'กรุงเทพฯ',
    'bangkok.subtitle': 'ยินดีต้อนรับสู่เมืองแห่งทูตสวรรค์',
    'bangkok.subtitleThai': 'เมืองแห่งทูตสวรรค์',
    'bangkok.food': 'อาหารท้องถิ่น',
    'bangkok.foodDesc': 'ค้นพบอาหารไทยแท้และประสบการณ์อาหารริมทาง',
    'bangkok.temples': 'วัดและวัฒนธรรม',
    'bangkok.templesDesc': 'สำรวจวัดโบราณและมรดกทางวัฒนธรรมที่อุดมสมบูรณ์',
    'bangkok.shopping': 'ช้อปปิ้ง',
    'bangkok.shoppingDesc': 'จากห้างสรรพสินค้าฟุ่มเฟือยไปจนถึงตลาดคึกคัก',
    'bangkok.findFood': 'หาอาหาร',
    'bangkok.transportation': 'การขนส่ง',
    'bangkok.hotels': 'โรงแรม',
    'bangkok.attractions': 'สถานที่ท่องเที่ยว',
    
    // Chiang Mai
    'chiangmai.title': 'เชียงใหม่',
    'chiangmai.subtitle': 'ดอกกุหลาบแห่งภาคเหนือ',
    'chiangmai.subtitleThai': 'ดอกกุหลาบแห่งภาคเหนือ',
    'chiangmai.temples': 'วัดและวัฒนธรรม',
    'chiangmai.templesDesc': 'สำรวจวัดโบราณและวัฒนธรรมล้านนาที่อุดมสมบูรณ์',
    'chiangmai.mountains': 'ภูเขาและธรรมชาติ',
    'chiangmai.mountainsDesc': 'การเดินป่า น้ำตก และการผจญภัยบนภูเขา',
    'chiangmai.markets': 'ตลาดกลางคืน',
    'chiangmai.marketsDesc': 'ถนนคนเดินวันอาทิตย์ที่มีชื่อเสียงและงานหัตถกรรมท้องถิ่น',
    'chiangmai.templesAction': 'วัด',
    'chiangmai.trekking': 'เดินป่า',
    'chiangmai.marketsAction': 'ตลาด',
    'chiangmai.food': 'อาหาร',
    
    // Phuket
    'phuket.title': 'ภูเก็ต',
    'phuket.subtitle': 'ไข่มุกแห่งอันดามัน',
    'phuket.subtitleThai': 'ไข่มุกแห่งอันดามัน',
    'phuket.beaches': 'ชายหาดและเกาะ',
    'phuket.beachesDesc': 'ชายหาดสวยงามและการผจญภัยไปเกาะต่างๆ',
    'phuket.water': 'กิจกรรมทางน้ำ',
    'phuket.waterDesc': 'ดำน้ำ ดำน้ำตื้น และกีฬาทางน้ำ',
    'phuket.sunset': 'ทิวทัศน์พระอาทิตย์ตก',
    'phuket.sunsetDesc': 'พระอาทิตย์ตกที่สวยงามและอาหารค่ำโรแมนติก',
    'phuket.beachesAction': 'ชายหาด',
    'phuket.diving': 'ดำน้ำ',
    'phuket.islandTours': 'ทัวร์เกาะ',
    'phuket.sunsetAction': 'พระอาทิตย์ตก',
    
    // Pattaya
    'pattaya.title': 'พัทยา',
    'pattaya.subtitle': 'เมืองชายหาด',
    'pattaya.subtitleThai': 'เมืองชายหาด',
    'pattaya.beach': 'กิจกรรมชายหาด',
    'pattaya.beachDesc': 'กีฬาทางน้ำ บาร์ชายหาด และการพักผ่อน',
    'pattaya.entertainment': 'ความบันเทิง',
    'pattaya.entertainmentDesc': 'การแสดง ไนท์ไลฟ์ และการแสดงทางวัฒนธรรม',
    'pattaya.shopping': 'ช้อปปิ้ง',
    'pattaya.shoppingDesc': 'ตลาด ห้างสรรพสินค้า และของที่ระลึกท้องถิ่น',
    'pattaya.beachesAction': 'ชายหาด',
    'pattaya.shows': 'การแสดง',
    'pattaya.shoppingAction': 'ช้อปปิ้ง',
    'pattaya.food': 'อาหาร',
    
    // Mae Sai
    'maesai.title': 'แม่สาย',
    'maesai.subtitle': 'เมืองชายแดนภาคเหนือ',
    'maesai.subtitleThai': 'เมืองชายแดนภาคเหนือ',
    'maesai.market': 'ตลาดชายแดน',
    'maesai.marketDesc': 'การช้อปปิ้งข้ามพรมแดนและงานหัตถกรรมท้องถิ่น',
    'maesai.mountains': 'ทิวทัศน์ภูเขา',
    'maesai.mountainsDesc': 'ทิวทัศน์ภูเขาที่สวยงามและธรรมชาติ',
    'maesai.culture': 'วัฒนธรรมท้องถิ่น',
    'maesai.cultureDesc': 'ชุมชนชนเผ่าบนภูเขาและประเพณี',
    'maesai.marketsAction': 'ตลาด',
    'maesai.nature': 'ธรรมชาติ',
    'maesai.cultureAction': 'วัฒนธรรม',
    'maesai.food': 'อาหาร',
    'maesai.borderInfo': 'ข้อมูลชายแดน',
    'maesai.borderDesc': 'แม่สายเป็นเมืองชายแดนเหนือสุดของประเทศไทย เชื่อมต่อกับเมียนมา การข้ามพรมแดนเปิดทุกวันสำหรับการเดินทางไปเช้าเย็นกลับและการช้อปปิ้ง',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.changeCity': '切换城市',
    'nav.otherCities': '其他城市',
    'nav.back': '返回',
    
    // Theme
    'theme.light': '浅色',
    'theme.dark': '深色',
    'theme.toggle': '切换主题',
    
    // Language
    'lang.english': 'English',
    'lang.thai': 'ไทย',
    'lang.chinese': '中文',
    'lang.select': '选择语言',
    
    // Common
    'common.loading': '加载中...',
    'common.detecting': '正在检测您的位置...',
    'common.error': '错误',
    'common.tryAgain': '重试',
    'common.comingSoon': '即将推出！',
    'common.underDevelopment': '开发中',
    'common.developmentNotice': '此城市页面正在开发中。我们正在努力为您带来最佳体验。请稍后查看更新！',
    
    // City pages
    'city.welcome': '欢迎来到',
    'city.quickActions': '快速操作',
    'city.select': '选择您的城市',
    'city.selectDescription': '选择您的城市开始使用 GoingTown',
    'city.nearby': '附近城市',
    'city.allCities': '所有可用城市',
    'city.nearbyCities': '附近城市',
    'city.distance': '公里',
    'city.groupByCountry': '按国家分组',
    'city.popularCities': '热门城市',
    
    // City Names - Chinese
    'city.bangkok': '曼谷',
    'city.chiang-mai': '清迈',
    'city.chiang-rai': '清莱',
    'city.phuket': '普吉岛',
    'city.pattaya': '芭提雅',
    'city.krabi': '甲米',
    'city.koh-samui': '苏梅岛',
    'city.koh-phangan': '帕岸岛',
    'city.koh-tao': '涛岛',
    'city.ayutthaya': '大城府',
    'city.sukhothai': '素可泰',
    'city.kanchanaburi': '北碧府',
    'city.hua-hin': '华欣',
    'city.cha-am': '差安',
    'city.khon-kaen': '孔敬',
    'city.udon-thani': '乌隆他尼',
    'city.nakhon-ratchasima': '呵叻',
    'city.ubon-ratchathani': '乌汶府',
    'city.hat-yai': '合艾',
    'city.surat-thani': '素叻他尼',
    'city.nakhon-si-thammarat': '洛坤府',
    'city.trang': '董里',
    'city.krabi-town': '甲米镇',
    'city.ranong': '拉廊',
    'city.chumphon': '春蓬',
    'city.mae-sai': '美塞',
    'city.singapore': '新加坡',
    'city.kuala-lumpur': '吉隆坡',
    'city.jakarta': '雅加达',
    'city.manila': '马尼拉',
    'city.ho-chi-minh': '胡志明市',
    'city.hanoi': '河内',
    'city.seoul': '首尔',
    'city.tokyo': '东京',
    'city.osaka': '大阪',
    'city.hong-kong': '香港',
    'city.taipei': '台北',
    'city.beijing': '北京',
    'city.shanghai': '上海',
    'city.guangzhou': '广州',
    'city.shenzhen': '深圳',
    'city.chengdu': '成都',
    'city.hangzhou': '杭州',
    'city.wuhan': '武汉',
    'city.xian': '西安',
    'city.nanjing': '南京',
    'city.tianjin': '天津',
    'city.chongqing': '重庆',
    'city.suzhou': '苏州',
    'city.dongguan': '东莞',
    'city.foshan': '佛山',
    'city.qingdao': '青岛',
    'city.dalian': '大连',
    'city.ningbo': '宁波',
    'city.xiamen': '厦门',
    'city.changsha': '长沙',
    'city.zhengzhou': '郑州',
    'city.jinan': '济南',
    'city.harbin': '哈尔滨',
    'city.shenyang': '沈阳',
    'city.kunming': '昆明',
    'city.nanchang': '南昌',
    'city.fuzhou': '福州',
    'city.shijiazhuang': '石家庄',
    'city.taiyuan': '太原',
    'city.hefei': '合肥',
    'city.nanning': '南宁',
    'city.guiyang': '贵阳',
    'city.lanzhou': '兰州',
    'city.urumqi': '乌鲁木齐',
    'city.hohhot': '呼和浩特',
    'city.yinchuan': '银川',
    'city.xining': '西宁',
    'city.lhasa': '拉萨',
    'city.sydney': '悉尼',
    'city.melbourne': '墨尔本',
    'city.london': '伦敦',
    'city.paris': '巴黎',
    'city.berlin': '柏林',
    'city.amsterdam': '阿姆斯特丹',
    'city.new-york': '纽约',
    'city.los-angeles': '洛杉矶',
    'city.san-francisco': '旧金山',
    'city.toronto': '多伦多',
    'city.vancouver': '温哥华',
    
    // Bangkok
    'bangkok.title': '曼谷',
    'bangkok.subtitle': '欢迎来到天使之城',
    'bangkok.subtitleThai': 'เมืองแห่งทูตสวรรค์',
    'bangkok.food': '当地美食',
    'bangkok.foodDesc': '发现正宗的泰国美食和街头小吃体验',
    'bangkok.temples': '寺庙与文化',
    'bangkok.templesDesc': '探索古庙和丰富的文化遗产',
    'bangkok.shopping': '购物',
    'bangkok.shoppingDesc': '从豪华购物中心到繁华市场',
    'bangkok.findFood': '寻找美食',
    'bangkok.transportation': '交通',
    'bangkok.hotels': '酒店',
    'bangkok.attractions': '景点',
    
    // Chiang Mai
    'chiangmai.title': '清迈',
    'chiangmai.subtitle': '北方玫瑰',
    'chiangmai.subtitleThai': 'ดอกกุหลาบแห่งภาคเหนือ',
    'chiangmai.temples': '寺庙与文化',
    'chiangmai.templesDesc': '探索古庙和丰富的兰纳文化',
    'chiangmai.mountains': '山脉与自然',
    'chiangmai.mountainsDesc': '徒步、瀑布和山地冒险',
    'chiangmai.markets': '夜市',
    'chiangmai.marketsDesc': '著名的周日步行街和当地工艺品',
    'chiangmai.templesAction': '寺庙',
    'chiangmai.trekking': '徒步',
    'chiangmai.marketsAction': '市场',
    'chiangmai.food': '美食',
    
    // Phuket
    'phuket.title': '普吉岛',
    'phuket.subtitle': '安达曼珍珠',
    'phuket.subtitleThai': 'ไข่มุกแห่งอันดามัน',
    'phuket.beaches': '海滩与岛屿',
    'phuket.beachesDesc': '美丽的海滩和跳岛冒险',
    'phuket.water': '水上活动',
    'phuket.waterDesc': '潜水、浮潜和水上运动',
    'phuket.sunset': '日落美景',
    'phuket.sunsetDesc': '壮观的日落和浪漫晚餐',
    'phuket.beachesAction': '海滩',
    'phuket.diving': '潜水',
    'phuket.islandTours': '跳岛游',
    'phuket.sunsetAction': '日落',
    
    // Pattaya
    'pattaya.title': '芭提雅',
    'pattaya.subtitle': '海滩城市',
    'pattaya.subtitleThai': 'เมืองชายหาด',
    'pattaya.beach': '海滩活动',
    'pattaya.beachDesc': '水上运动、海滩酒吧和休闲',
    'pattaya.entertainment': '娱乐',
    'pattaya.entertainmentDesc': '表演、夜生活和文化演出',
    'pattaya.shopping': '购物',
    'pattaya.shoppingDesc': '市场、购物中心和当地纪念品',
    'pattaya.beachesAction': '海滩',
    'pattaya.shows': '表演',
    'pattaya.shoppingAction': '购物',
    'pattaya.food': '美食',
    
    // Mae Sai
    'maesai.title': '美塞',
    'maesai.subtitle': '北部边境小镇',
    'maesai.subtitleThai': 'เมืองชายแดนภาคเหนือ',
    'maesai.market': '边境市场',
    'maesai.marketDesc': '跨境购物和当地工艺品',
    'maesai.mountains': '山景',
    'maesai.mountainsDesc': '壮丽的山景和自然风光',
    'maesai.culture': '当地文化',
    'maesai.cultureDesc': '山地部落社区和传统',
    'maesai.marketsAction': '市场',
    'maesai.nature': '自然',
    'maesai.cultureAction': '文化',
    'maesai.food': '美食',
    'maesai.borderInfo': '边境信息',
    'maesai.borderDesc': '美塞是泰国最北端的边境城市，与缅甸相连。边境口岸每日开放，可进行一日游和购物。',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 从 localStorage 读取语言设置
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && ['en', 'th', 'zh'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      // 检测浏览器语言
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'th') {
        setLanguage('th')
      } else if (browserLang === 'zh') {
        setLanguage('zh')
      } else {
        setLanguage('en')
      }
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language)
    }
  }, [language, mounted])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  if (!mounted) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
