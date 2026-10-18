package online.digitaldostcenter.app.data.model

data class Post(
    val id: String,
    val titleHi: String,
    val titleEn: String,
    val category: PostCategory,
    val state: String = "Bihar",
    val publishedDate: String,
    val lastDate: String,
    val feeGeneral: String,
    val feeReserved: String,
    val ageLimit: String,
    val qualification: String,
    val totalVacancies: String,
    val applyUrl: String,
    val officialUrl: String,
    val notificationPdfUrl: String,
    val isDemo: Boolean = true,
    val isBookmarked: Boolean = false,
    val descriptionHi: String,
    val descriptionEn: String,
    val importantDates: List<Pair<String, String>> = emptyList(),
    val eligibilityPoints: List<String> = emptyList()
)
