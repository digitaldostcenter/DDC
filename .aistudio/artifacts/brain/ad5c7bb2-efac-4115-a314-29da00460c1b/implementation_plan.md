# Digital Dost Centre (DDC) — Native Android Application (Jetpack Compose & Material 3)

A complete, production-ready native Android application built with Kotlin, Jetpack Compose, and Material 3 for [digitaldostcenter.online](https://digitaldostcenter.online), tailored for students and job aspirants in Bihar and across India for government jobs, admit cards, results, scholarships, admissions, and student utilities.

## User Review & Critical Decisions

> [!IMPORTANT]
> The app delivers both a complete native Android Kotlin/Jetpack Compose codebase (ready for Android Studio / Gradle builds) and an interactive Material 3 Android preview in the AI Studio environment so you can test all screens, gestures, bilingual Hindi/English switching, and offline bookmarks immediately.

- **Confirmed Architecture**: Complete native Android Kotlin project (`android/`) adhering to modern Android architecture standards (Jetpack Compose, Material 3, ViewModel, StateFlow, Coroutines, Repository pattern) coupled with an interactive web simulator for live inspection and one-click Android source export.
- **Data Source Strategy**: Clean Repository layer providing verified demo data (strictly labeled `[DEMO]` with authentic Bihar & National recruitment schemas) and an auto-sync engine ready to connect to `digitaldostcenter.online` REST API / RSS feeds.
- **Language & Localization**: Default Hindi (हिंदी) with English sub-labels and an instant bilingual toggle across all views.
- **Push Notification Architecture**: Decoupled Firebase Cloud Messaging (FCM) client service with local Notification Inbox, read/unread states, and notification channel controls.

---

## 1. Overview & Core Concept

- **What It Does**: Digital Dost Centre (DDC) delivers instant alerts, detailed eligibility rules, important dates, syllabus downloads, admit card links, and application portals for Sarkari jobs (BPSC, Bihar Police, SSC, Railway, Banking, Teaching), university admissions (Patna University, BRABU, VKSU, etc.), national & state scholarships (NSP, Bihar Post-Matric), answer keys, and student utility tools (Age Calculator, Document Resizer).
- **Target Audience / Persona**: Students, competitive exam aspirants, and rural youth in Bihar and across India who need fast, zero-slop, authentic recruitment updates on entry-level and high-end Android smartphones.
- **Key Value**: 100% verified updates without clickbait or fake notification badges; instant bookmarking for offline consultation; clean direct links to official government portals (`.gov.in`, `.nic.in`, `.ac.in`).

---

## 2. User Experience & Visual Design

```
+----------------------------------------------------------------+
|  Digital Dost Centre (DDC) Android UI Hierarchy               |
+----------------------------------------------------------------+
| [ Top App Bar: DDC Logo · Search Bar · Language Toggle · Bell] |
|                                                                |
| [ Latest Updates Ticker / Alert Banner ]                       |
|                                                                |
| [ Category Grid (Material 3 Cards) ]                           |
|   • Sarkari Jobs      • Results           • Admit Cards        |
|   • Scholarships      • Admissions        • Answer Keys        |
|   • Syllabus          • Govt Schemes      • DDC Tools          |
|                                                                |
| [ Latest Announcements Feed (Pull-to-Refresh) ]                |
|   • Post Card: Title · Category · Date · Eligibility · View    |
|                                                                |
| [ Bottom Navigation Bar (Material 3 NavigationBar) ]           |
|   • Home (होम)        • Categories        • Saved (सहेजे गए)  |
|   • Notifications     • More (अधिक)                            |
+----------------------------------------------------------------+
```

### Visual Identity & Theme
- **Color Palette**:
  - Primary Blue: `#1565C0` (Material 3 Deep Indigo Blue — authoritative, accessible)
  - Surface Light: `#F8FAFC` canvas with `#FFFFFF` cards and `#E2E8F0` hairline borders
  - Dark Mode Surface: `#0F172A` canvas with `#1E293B` cards and `#334155` subtle outlines
  - Accent / Action: `#0284C7` (Sky Blue) & `#059669` (Emerald for verified links and Apply buttons)
  - Contrast: Strictly WCAG AA compliant with 4.5:1+ text contrast on all backgrounds
- **Typography**: Clean humanist typography (Noto Sans Hindi & Inter/Roboto) with tabular figures for dates, fees, and age limits.
- **Component Styling**:
  - Material 3 `ElevatedCard` and `OutlinedCard` with `16dp` rounded corners.
  - Zero-pill metadata: Categories, dates, and post types displayed as clean unboxed typography with bullet (`·`) separators.
  - Generous touch targets ($\ge 48\text{dp}$) suitable for one-handed thumb reach on mobile screens.

### Core Screens & Flows
1. **Home Screen**:
   - Branded Top Bar with DDC emblem, search trigger, bilingual toggle, and unread notification badge.
   - Quick Category Grid with 9 primary student categories.
   - Announcement feed with pull-to-refresh, verified badges, and search filtering.
2. **Category Browse Screen**:
   - Filterable view organized by Sarkari Jobs, Bihar Special, Results, Admit Cards, Admissions, and Schemes.
3. **Post Details Screen**:
   - Comprehensive breakdown: Post Overview, Important Dates (Application Start, Last Date, Exam Date), Application Fee, Age Limit & Relaxation, Eligibility Criteria, Vacancy Details, and Official Links (`Apply Online`, `Download Notification PDF`, `Official Website`).
   - Action bar: Bookmark post, Share via WhatsApp/Android ShareSheet, and Copy Direct Link.
4. **Saved / Bookmarked Screen**:
   - Persistent local offline store; search within saved posts; quick remove and bulk clear.
5. **Notification Inbox Screen**:
   - Grouped alerts by date (Today, Yesterday, Earlier); read/unread markers; direct deep-link into the relevant post.
6. **More / Settings Screen**:
   - About DDC (Digital Dost Centre story, Kaimur Bihar offline centre details), Notification Preferences (Job Alerts, Exam Dates, Admissions), Dark/Light theme selector, Disclaimer & Privacy Policy, and Official Website link.
7. **DDC Student Tools**:
   - Built-in Age Calculator (calculate exact age as of notification cutoff date) and Exam Photo/Signature dimension guide.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual Project Provisioning (Native Kotlin Codebase + Live Material 3 Web Preview)**
  - *Chosen Approach*: Deliver the complete, production-grade Android Jetpack Compose codebase under `android/` alongside an interactive Material 3 Android Device Simulator in the root app.
  - *Why*: Allows immediate visual and interactive verification of all user flows, translations, and states directly in the AI Studio environment, while providing the standard Android Gradle project ready to import into Android Studio or build with `./gradlew assembleRelease`.
- **Decision 2: Authentic Demo Data vs. Live Scraping**
  - *Chosen Approach*: Strictly label initial recruitment records as `[DEMO - Verified Sample Format]` mirroring actual Bihar recruitment exams (e.g. BPSC Teacher Recruitment, Bihar Police Constable, Bihar Post Matric Scholarship, Patna University UG Admission), while structuring the repository with a pluggable `DdcRemoteDataSource` interface for `https://digitaldostcenter.online/wp-json/wp/v2/posts`.
  - *Why*: Adheres to the prompt requirement to never display fabricated statistics or invent fake official deadlines, while ensuring the app is immediately usable offline.
- **Decision 3: Offline Persistence Strategy**
  - *Chosen Approach*: Room Database / Android DataStore architecture pattern for Android, mirrored with local storage in the interactive simulator for bookmarks, search history, and notification read states.

---

## 4. Technical Architecture & Data Strategy

```
┌───────────────────────────────────────────────────────────────┐
│                      Android Architecture                     │
├───────────────────────────────────────────────────────────────┤
│                     Jetpack Compose UI                        │
│   (HomeScreen · PostDetailScreen · SavedScreen · MoreScreen)  │
└───────────────────────────────▲───────────────────────────────┘
                                │ StateFlow / Events
┌───────────────────────────────┴───────────────────────────────┐
│                    DdcViewModel / State                       │
│    (FeedState · FilterState · BookmarkState · LocaleState)    │
└───────────────────────────────▲───────────────────────────────┘
                                │ Coroutines / Flow
┌───────────────────────────────┴───────────────────────────────┐
│                     Repository Layer                          │
│               (DdcRepository & DdcRepositoryImpl)             │
├───────────────────────────────┬───────────────────────────────┤
│      Local Data Source        │      Remote Data Source       │
│  (DataStore / Room / Cache)   │ (digitaldostcenter.online API)│
└───────────────────────────────┴───────────────────────────────┘
```

### Complete Native Android File Tree (`android/`):
- `android/settings.gradle.kts`
- `android/build.gradle.kts`
- `android/gradle/wrapper/gradle-wrapper.properties`
- `android/app/build.gradle.kts` (Compose BOM, Material 3, Navigation Compose, Lifecycle ViewModel, Coil)
- `android/app/src/main/AndroidManifest.xml` (Permissions: INTERNET, POST_NOTIFICATIONS)
- `android/app/src/main/res/values/strings.xml`, `colors.xml`, `themes.xml`
- `android/app/src/main/java/online/digitaldostcenter/app/`:
  - `MainActivity.kt`
  - `data/model/Post.kt`, `Category.kt`, `NotificationItem.kt`
  - `data/repository/DdcRepository.kt`, `DdcRepositoryImpl.kt`
  - `data/datasource/SampleDataProvider.kt`
  - `ui/theme/Theme.kt`, `Color.kt`, `Type.kt`
  - `ui/navigation/DdcNavigation.kt`, `DdcDestination.kt`
  - `ui/viewmodel/DdcViewModel.kt`
  - `ui/screens/HomeScreen.kt`, `CategoryScreen.kt`, `PostDetailScreen.kt`, `SavedScreen.kt`, `MoreScreen.kt`, `NotificationScreen.kt`, `ToolsScreen.kt`
  - `service/DdcFirebaseMessagingService.kt` (Architecture stub ready for FCM push notifications)

### Interactive Web Companion (`src/`):
- `src/App.tsx`: Full Material 3 Android Device Simulator with device frame toggle, Hindi/English bilingual toggle, search, bookmarking, notification inbox, deep post details, and "Download Android Project" bundle generator.
- `src/data/posts.ts`: Strongly typed verified recruitment records matching the Kotlin data model.
- `src/types/index.ts`: Shared data contracts.
