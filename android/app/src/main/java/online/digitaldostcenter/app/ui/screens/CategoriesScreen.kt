package online.digitaldostcenter.app.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import online.digitaldostcenter.app.data.model.PostCategory
import online.digitaldostcenter.app.ui.viewmodel.AppLanguage

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CategoriesScreen(
    language: AppLanguage,
    onCategoryClick: (PostCategory) -> Unit
) {
    val isHindi = language == AppLanguage.HINDI

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = if (isHindi) "श्रेणियां (Categories)" else "Categories",
                        fontWeight = FontWeight.Bold
                    )
                }
            )
        }
    ) { innerPadding ->
        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(PostCategory.entries.toTypedArray()) { cat ->
                CategoryCard(
                    category = cat,
                    isHindi = isHindi,
                    onClick = { onCategoryClick(cat) }
                )
            }
        }
    }
}

@Composable
fun CategoryCard(
    category: PostCategory,
    isHindi: Boolean,
    onClick: () -> Unit
) {
    val icon = when (category) {
        PostCategory.GOVT_JOBS -> Icons.Default.Work
        PostCategory.RESULTS -> Icons.Default.Grade
        PostCategory.ADMIT_CARDS -> Icons.Default.Badge
        PostCategory.SCHOLARSHIPS -> Icons.Default.School
        PostCategory.ADMISSIONS -> Icons.Default.AccountBalance
        PostCategory.ANSWER_KEYS -> Icons.Default.FactCheck
        PostCategory.SYLLABUS -> Icons.Default.MenuBook
        PostCategory.GOVT_SCHEMES -> Icons.Default.AccountTree
        PostCategory.DDC_TOOLS -> Icons.Default.Build
    }

    ElevatedCard(
        modifier = Modifier
            .fillMaxWidth()
            .height(115.dp)
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(14.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(12.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(32.dp)
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = if (isHindi) category.titleHi else category.titleEn,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.SemiBold,
                textAlign = TextAlign.Center,
                fontSize = 13.sp,
                maxLines = 2
            )
        }
    }
}
