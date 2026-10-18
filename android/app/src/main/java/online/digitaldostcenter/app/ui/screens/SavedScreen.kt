package online.digitaldostcenter.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.BookmarkRemove
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import online.digitaldostcenter.app.data.model.Post
import online.digitaldostcenter.app.ui.viewmodel.AppLanguage

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SavedScreen(
    savedPosts: List<Post>,
    language: AppLanguage,
    onPostClick: (String) -> Unit,
    onRemoveBookmark: (String) -> Unit
) {
    val isHindi = language == AppLanguage.HINDI

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = if (isHindi) "सहेजे गए पोस्ट (Saved)" else "Saved Posts",
                        fontWeight = FontWeight.Bold
                    )
                }
            )
        }
    ) { innerPadding ->
        if (savedPosts.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
                    .padding(32.dp),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        imageVector = Icons.Default.BookmarkRemove,
                        contentDescription = null,
                        modifier = Modifier.size(56.dp),
                        tint = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(
                        text = if (isHindi) "कोई सहेजा हुआ पोस्ट नहीं" else "No Saved Posts Yet",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = if (isHindi)
                            "महत्वपूर्ण सरकारी नौकरी, रिजल्ट अथवा प्रवेश सूचनाओं को ऑफलाइन पढ़ने हेतु बुकमार्क करें।"
                        else
                            "Bookmark important recruitments, admit cards or exam results to consult them offline anytime.",
                        style = MaterialTheme.typography.bodyMedium,
                        textAlign = TextAlign.Center,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
                    .padding(horizontal = 16.dp),
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                items(savedPosts) { post ->
                    PostCard(
                        post = post,
                        isHindi = isHindi,
                        onPostClick = { onPostClick(post.id) },
                        onBookmarkClick = { onRemoveBookmark(post.id) }
                    )
                }
            }
        }
    }
}
