package online.digitaldostcenter.app.ui.screens

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.BookmarkBorder
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import online.digitaldostcenter.app.data.model.Post
import online.digitaldostcenter.app.ui.theme.DdcVerifiedGreen
import online.digitaldostcenter.app.ui.viewmodel.AppLanguage

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PostDetailScreen(
    post: Post?,
    language: AppLanguage,
    onBackClick: () -> Unit,
    onBookmarkClick: (String) -> Unit
) {
    val context = LocalContext.current
    val isHindi = language == AppLanguage.HINDI

    if (post == null) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text(if (isHindi) "पोस्ट उपलब्ध नहीं है" else "Post not found")
        }
        return
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = if (isHindi) post.category.titleHi else post.category.titleEn,
                        maxLines = 1
                    )
                },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    IconButton(onClick = {
                        val shareIntent = Intent(Intent.ACTION_SEND).apply {
                            type = "text/plain"
                            putExtra(
                                Intent.EXTRA_TEXT,
                                "${if (isHindi) post.titleHi else post.titleEn}\n\nअंतिम तिथि: ${post.lastDate}\nविस्तृत जानकारी देखें: https://digitaldostcenter.online"
                            )
                        }
                        context.startActivity(Intent.createChooser(shareIntent, "Share via"))
                    }) {
                        Icon(Icons.Default.Share, contentDescription = "Share")
                    }
                    IconButton(onClick = { onBookmarkClick(post.id) }) {
                        Icon(
                            imageVector = if (post.isBookmarked) Icons.Filled.Bookmark else Icons.Outlined.BookmarkBorder,
                            contentDescription = "Save",
                            tint = if (post.isBookmarked) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurface
                        )
                    }
                }
            )
        },
        bottomBar = {
            Surface(
                tonalElevation = 8.dp,
                shadowElevation = 8.dp
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    OutlinedButton(
                        onClick = {
                            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(post.officialUrl))
                            context.startActivity(intent)
                        },
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Text(if (isHindi) "आधिकारिक पोर्टल" else "Official Portal", maxLines = 1)
                    }
                    Button(
                        onClick = {
                            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(post.applyUrl))
                            context.startActivity(intent)
                        },
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Text(if (isHindi) "ऑनलाइन आवेदन" else "Apply Online", maxLines = 1)
                    }
                }
            }
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Post Title & Demo Label
            item {
                if (post.isDemo) {
                    Surface(
                        color = MaterialTheme.colorScheme.errorContainer.copy(alpha = 0.5f),
                        shape = RoundedCornerShape(8.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Row(
                            modifier = Modifier.padding(10.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                Icons.Default.Info,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.error,
                                modifier = Modifier.size(20.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = if (isHindi)
                                    "सत्यापित प्रारूप [डेमो]: यह पोस्ट डिजिटल दोस्त सेन्टर का प्रामाणिक प्रारूप दर्शाती है। आवेदन से पूर्व आधिकारिक विज्ञप्ति अवश्य देखें।"
                                else
                                    "Verified Sample [DEMO]: Represents authentic guidelines. Please verify official notification PDF before submitting.",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onErrorContainer
                            )
                        }
                    }
                    Spacer(modifier = Modifier.height(10.dp))
                }

                Text(
                    text = if (isHindi) post.titleHi else post.titleEn,
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "${if (isHindi) "प्रकाशित तिथि" else "Published"}: ${post.publishedDate} · ${post.state}",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            // Key Highlights Card
            item {
                OutlinedCard(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                            Text(if (isHindi) "कुल पद / रिक्तियां" else "Total Vacancies", fontWeight = FontWeight.Medium)
                            Text(post.totalVacancies, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                        }
                        HorizontalDivider()
                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                            Text(if (isHindi) "आवेदन की अंतिम तिथि" else "Last Date", fontWeight = FontWeight.Medium)
                            Text(post.lastDate, fontWeight = FontWeight.Bold)
                        }
                        HorizontalDivider()
                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                            Text(if (isHindi) "आयु सीमा" else "Age Limit", fontWeight = FontWeight.Medium)
                            Text(post.ageLimit, fontWeight = FontWeight.Medium)
                        }
                    }
                }
            }

            // Important Dates Card
            if (post.importantDates.isNotEmpty()) {
                item {
                    Text(
                        text = if (isHindi) "महत्वपूर्ण तिथियां (Important Dates)" else "Important Dates",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedCard(modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(12.dp)) {
                        Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            post.importantDates.forEach { (label, date) ->
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(label, style = MaterialTheme.typography.bodyMedium)
                                    Text(date, fontWeight = FontWeight.SemiBold, style = MaterialTheme.typography.bodyMedium)
                                }
                            }
                        }
                    }
                }
            }

            // Application Fee Card
            item {
                Text(
                    text = if (isHindi) "आवेदन शुल्क (Application Fee)" else "Application Fee",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(6.dp))
                OutlinedCard(modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(12.dp)) {
                    Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                            Text(if (isHindi) "सामान्य / ओबीसी / अन्य राज्य" else "General / OBC / Other State")
                            Text(post.feeGeneral, fontWeight = FontWeight.Bold)
                        }
                        HorizontalDivider()
                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                            Text(if (isHindi) "एससी / एसटी / महिला / दिव्यांग" else "SC / ST / Female / PwD")
                            Text(post.feeReserved, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }

            // Eligibility & Qualification
            item {
                Text(
                    text = if (isHindi) "शैक्षणिक योग्यता एवं पात्रता" else "Eligibility & Qualification",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(6.dp))
                OutlinedCard(modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(12.dp)) {
                    Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Text(
                            text = post.qualification,
                            style = MaterialTheme.typography.bodyMedium,
                            fontWeight = FontWeight.SemiBold
                        )
                        post.eligibilityPoints.forEach { point ->
                            Row(modifier = Modifier.fillMaxWidth()) {
                                Text("• ", fontWeight = FontWeight.Bold)
                                Text(point, style = MaterialTheme.typography.bodyMedium)
                            }
                        }
                    }
                }
            }

            // Description
            item {
                Text(
                    text = if (isHindi) "विवरण एवं निर्देश" else "Details & Overview",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = if (isHindi) post.descriptionHi else post.descriptionEn,
                    style = MaterialTheme.typography.bodyMedium,
                    lineHeight = 22.sp
                )
                Spacer(modifier = Modifier.height(24.dp))
            }
        }
    }
}
