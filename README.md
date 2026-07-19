# Wkasha — تطبيق React Native (أندرويد)

تطبيق مصمم لبناء العضلات فالمنزل: اختيار عضلة من مخطط جسم ثلاثي الأبعاد، لائحة تمارين لكل عضلة، ومؤقت تفاعلي (Interval Timer) بصوت واهتزاز حقيقي.

هاد المشروع كتابة React Native كاملة (Expo managed workflow) — بلا HTML/CSS، بلا React DOM، كامل الواجهة بـ `View` / `Text` / `Image` / `TouchableOpacity` / `ScrollView` وSVG أصلي (`react-native-svg`).

## بنية المشروع

```
WkashaNative/
├── App.js                     # نقطة الدخول + التنقل بين الشاشات (React Navigation)
├── app.json                   # إعدادات Expo (اسم الحزمة، الصلاحيات...)
├── eas.json                   # إعدادات بناء APK عبر EAS Build (سحابي)
├── babel.config.js
├── package.json
├── assets/
│   ├── body-front.png         # صورة الجسم الأمامية (شفافة الخلفية)
│   ├── body-back.png          # صورة الجسم الخلفية
│   └── beep-*.wav             # أصوات التنبيه (تمرين/راحة/انتهاء)
└── src/
    ├── theme/colors.js        # الألوان
    ├── data/exercises.js      # بيانات العضلات والتمارين (30 تمرين)
    ├── hooks/useBeep.js       # الصوت + الاهتزاز (expo-av + Vibration)
    ├── components/BodyMap.js  # مخطط الجسم التفاعلي (Image + TouchableOpacity)
    └── screens/
        ├── HomeScreen.js
        ├── ExerciseListScreen.js
        └── TimerScreen.js     # المؤقت (react-native-svg لدائرة التقدم)
```

## تشغيل المشروع محليًا

```bash
npm install
npx expo start
```
سكانير الـ QR code بتطبيق **Expo Go** من هاتف أندرويد باش تجرب التطبيق مباشرة (أسرع طريقة للتجربة).

## بناء APK حقيقي

عندك طريقتين، حسب اللي متوفر عندك:

### الطريقة أ) EAS Build (سحابي — ما كتحتاجش Android Studio)
```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```
هاد الأمر كيبني APK كامل فسيرفرات Expo وكيعطيك رابط تحميل مباشر. الـ profile `preview` معدّة فـ `eas.json` باش تخرج `.apk` (وليس `.aab`).

### الطريقة ب) بناء محلي (كتحتاج Android Studio + JDK 17 مثبتين)
```bash
npx expo prebuild --platform android
cd android
./gradlew assembleRelease
```
الـ APK غادي يكون فـ:
`android/app/build/outputs/apk/release/app-release.apk`

## ملاحظات مهمة

- اسم حزمة أندرويد (`android.package`) فـ `app.json` معدّ حاليًا كـ `com.wkasha.app` — بدّلو إلا بغيتي تنشرو فـ Google Play بحزمة خاصة بيك.
- الخط الحالي هو خط النظام الافتراضي (بلا اعتماد على إنترنت). إلا بغيتي خط "Cairo" بالضبط كيفما فالنسخة web، زيد `expo install expo-font @expo-google-fonts/cairo` وحمّلو فـ `App.js` عبر `useFonts`.
- الأصوات (`beep-work.wav`, `beep-rest.wav`, `beep-done.wav`) مولّدة محليًا (نغمات بسيطة)، خفيفة الحجم، وما كتحتاجش إنترنت باش تخدم.
- التطبيق مفعّل عليه دعم RTL (اتجاه اليمين لليسار) بشكل كامل عبر `I18nManager`.
