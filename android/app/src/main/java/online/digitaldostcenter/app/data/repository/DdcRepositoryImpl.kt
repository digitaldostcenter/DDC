package online.digitaldostcenter.app.data.repository

import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.map
import online.digitaldostcenter.app.data.datasource.SampleDataProvider
import online.digitaldostcenter.app.data.model.NotificationItem
import online.digitaldostcenter.app.data.model.Post
import online.digitaldostcenter.app.data.model.PostCategory

class DdcRepositoryImpl : DdcRepository {

    private val _posts = MutableStateFlow<List<Post>>(SampleDataProvider.samplePosts)
    val posts: Flow<List<Post>> = _posts.asStateFlow()

    private val _savedPostIds = MutableStateFlow<Set<String>>(emptySet())
    private val _notifications = MutableStateFlow<List<NotificationItem>>(SampleDataProvider.sampleNotifications)

    override fun getLatestPosts(): Flow<List<Post>> {
        return _posts.map { list ->
            list.map { post ->
                post.copy(isBookmarked = _savedPostIds.value.contains(post.id))
            }
        }
    }

    override fun getPostsByCategory(category: PostCategory): Flow<List<Post>> {
        return _posts.map { list ->
            list.filter { it.category == category }.map { post ->
                post.copy(isBookmarked = _savedPostIds.value.contains(post.id))
            }
        }
    }

    override fun searchPosts(query: String): Flow<List<Post>> {
        val q = query.trim().lowercase()
        return _posts.map { list ->
            if (q.isEmpty()) {
                list
            } else {
                list.filter { post ->
                    post.titleHi.lowercase().contains(q) ||
                    post.titleEn.lowercase().contains(q) ||
                    post.qualification.lowercase().contains(q) ||
                    post.category.titleEn.lowercase().contains(q) ||
                    post.category.titleHi.lowercase().contains(q)
                }
            }.map { post ->
                post.copy(isBookmarked = _savedPostIds.value.contains(post.id))
            }
        }
    }

    override fun getPostById(id: String): Flow<Post?> {
        return _posts.map { list ->
            list.find { it.id == id }?.let { post ->
                post.copy(isBookmarked = _savedPostIds.value.contains(post.id))
            }
        }
    }

    override fun getSavedPosts(): Flow<List<Post>> {
        return _posts.map { list ->
            list.filter { _savedPostIds.value.contains(it.id) }.map {
                it.copy(isBookmarked = true)
            }
        }
    }

    override fun getNotifications(): Flow<List<NotificationItem>> {
        return _notifications.asStateFlow()
    }

    override suspend fun toggleBookmark(postId: String) {
        val current = _savedPostIds.value.toMutableSet()
        if (current.contains(postId)) {
            current.remove(postId)
        } else {
            current.add(postId)
        }
        _savedPostIds.value = current
    }

    override suspend fun markNotificationAsRead(id: String) {
        _notifications.value = _notifications.value.map {
            if (it.id == id) it.copy(isRead = true) else it
        }
    }

    override suspend fun markAllNotificationsAsRead() {
        _notifications.value = _notifications.value.map { it.copy(isRead = true) }
    }

    override suspend fun refreshFromWebsite(): Result<Boolean> {
        // In Phase 2, connect to https://digitaldostcenter.online/wp-json/wp/v2/posts
        // For Phase 1 demo verification, return success.
        return Result.success(true)
    }
}
