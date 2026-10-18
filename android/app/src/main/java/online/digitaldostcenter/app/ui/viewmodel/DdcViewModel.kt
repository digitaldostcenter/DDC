package online.digitaldostcenter.app.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import online.digitaldostcenter.app.data.model.NotificationItem
import online.digitaldostcenter.app.data.model.Post
import online.digitaldostcenter.app.data.model.PostCategory
import online.digitaldostcenter.app.data.repository.DdcRepository

enum class AppLanguage {
    HINDI,
    ENGLISH
}

data class DdcUiState(
    val posts: List<Post> = emptyList(),
    val savedPosts: List<Post> = emptyList(),
    val notifications: List<NotificationItem> = emptyList(),
    val selectedCategory: PostCategory? = null,
    val searchQuery: String = "",
    val isLoading: Boolean = false,
    val isRefreshing: Boolean = false,
    val language: AppLanguage = AppLanguage.HINDI,
    val errorMessage: String? = null
)

class DdcViewModel(
    private val repository: DdcRepository
) : ViewModel() {

    private val _searchQuery = MutableStateFlow("")
    val searchQuery = _searchQuery.asStateFlow()

    private val _selectedCategory = MutableStateFlow<PostCategory?>(null)
    val selectedCategory = _selectedCategory.asStateFlow()

    private val _language = MutableStateFlow(AppLanguage.HINDI)
    val language = _language.asStateFlow()

    private val _isRefreshing = MutableStateFlow(false)
    val isRefreshing = _isRefreshing.asStateFlow()

    val uiState: StateFlow<DdcUiState> = combine(
        repository.getLatestPosts(),
        repository.getSavedPosts(),
        repository.getNotifications(),
        _selectedCategory,
        _searchQuery,
        _language,
        _isRefreshing
    ) { allPosts, saved, notifs, cat, query, lang, refreshing ->
        var filtered = allPosts
        if (cat != null) {
            filtered = filtered.filter { it.category == cat }
        }
        if (query.isNotBlank()) {
            val q = query.trim().lowercase()
            filtered = filtered.filter {
                it.titleHi.lowercase().contains(q) ||
                it.titleEn.lowercase().contains(q) ||
                it.qualification.lowercase().contains(q) ||
                it.totalVacancies.lowercase().contains(q)
            }
        }
        DdcUiState(
            posts = filtered,
            savedPosts = saved,
            notifications = notifs,
            selectedCategory = cat,
            searchQuery = query,
            isLoading = false,
            isRefreshing = refreshing,
            language = lang
        )
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = DdcUiState(isLoading = true)
    )

    fun onSearchQueryChanged(query: String) {
        _searchQuery.value = query
    }

    fun onCategorySelected(category: PostCategory?) {
        _selectedCategory.value = if (_selectedCategory.value == category) null else category
    }

    fun toggleLanguage() {
        _language.value = if (_language.value == AppLanguage.HINDI) AppLanguage.ENGLISH else AppLanguage.HINDI
    }

    fun toggleBookmark(postId: String) {
        viewModelScope.launch {
            repository.toggleBookmark(postId)
        }
    }

    fun markNotificationAsRead(id: String) {
        viewModelScope.launch {
            repository.markNotificationAsRead(id)
        }
    }

    fun markAllNotificationsAsRead() {
        viewModelScope.launch {
            repository.markAllNotificationsAsRead()
        }
    }

    fun refresh() {
        viewModelScope.launch {
            _isRefreshing.value = true
            repository.refreshFromWebsite()
            _isRefreshing.value = false
        }
    }
}
