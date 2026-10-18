package online.digitaldostcenter.app.data.repository

import kotlinx.coroutines.flow.Flow
import online.digitaldostcenter.app.data.model.NotificationItem
import online.digitaldostcenter.app.data.model.Post
import online.digitaldostcenter.app.data.model.PostCategory

interface DdcRepository {
    fun getLatestPosts(): Flow<List<Post>>
    fun getPostsByCategory(category: PostCategory): Flow<List<Post>>
    fun searchPosts(query: String): Flow<List<Post>>
    fun getPostById(id: String): Flow<Post?>
    fun getSavedPosts(): Flow<List<Post>>
    suspend fun toggleBookmark(postId: String)
    fun getNotifications(): Flow<List<NotificationItem>>
    suspend fun markNotificationAsRead(id: String)
    suspend fun markAllNotificationsAsRead()
    suspend fun refreshFromWebsite(): Result<Boolean>
}
