package online.digitaldostcenter.app.data.model

enum class PostCategory(
    val id: String,
    val titleEn: String,
    val titleHi: String,
    val iconName: String
) {
    GOVT_JOBS("govt_jobs", "Government Jobs", "सरकारी नौकरी", "work"),
    RESULTS("results", "Results", "रिजल्ट", "grade"),
    ADMIT_CARDS("admit_cards", "Admit Cards", "एडमिट कार्ड", "badge"),
    SCHOLARSHIPS("scholarships", "Scholarships", "छात्रवृत्ति", "school"),
    ADMISSIONS("admissions", "Admissions", "प्रवेश (एडमिशन)", "account_balance"),
    ANSWER_KEYS("answer_keys", "Answer Keys", "उत्तर कुंजी", "fact_check"),
    SYLLABUS("syllabus", "Syllabus", "सिलेबस", "menu_book"),
    GOVT_SCHEMES("govt_schemes", "Govt Schemes", "सरकारी योजनाएं", "account_tree"),
    DDC_TOOLS("ddc_tools", "DDC Tools", "विद्यार्थी टूल्स", "build");

    companion object {
        fun fromId(id: String): PostCategory {
            return entries.find { it.id == id } ?: GOVT_JOBS
        }
    }
}
