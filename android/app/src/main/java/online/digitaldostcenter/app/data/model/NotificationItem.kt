package online.digitaldostcenter.app.data.model

data class NotificationItem(
    val id: String,
    val titleHi: String,
    val titleEn: String,
    val messageHi: String,
    val messageEn: String,
    val timestamp: String,
    val isRead: Boolean = false,
    val targetPostId: String? = null,
    val category: PostCategory = PostCategory.GOVT_JOBS
)
