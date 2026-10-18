package online.digitaldostcenter.app.ui.screens

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import online.digitaldostcenter.app.ui.viewmodel.AppLanguage

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MoreScreen(
    language: AppLanguage,
    onToolsClick: () -> Unit,
    onLanguageToggle: () -> Unit
) {
    val context = LocalContext.current
    val isHindi = language == AppLanguage.HINDI

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = if (isHindi) "अधिक जानकारी व सेटिंग्स" else "More & Settings",
                        fontWeight = FontWeight.Bold
                    )
                }
            )
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            // About DDC Card
            item {
                ElevatedCard(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(14.dp)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Surface(
                                modifier = Modifier.size(40.dp),
                                shape = RoundedCornerShape(10.dp),
                                color = MaterialTheme.colorScheme.primary
                            ) {
                                Box(contentAlignment = Alignment.Center) {
                                    Text("DDC", color = MaterialTheme.colorScheme.onPrimary, fontWeight = FontWeight.Bold)
                                }
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Column {
                                Text(
                                    text = if (isHindi) "डिजिटल दोस्त सेन्टर" else "Digital Dost Centre",
                                    style = MaterialTheme.typography.titleMedium,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = "digitaldostcenter.online",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(
                            text = if (isHindi)
                                "डिजिटल दोस्त सेन्टर (DDC) बिहार एवं देश भर के छात्र-छात्राओं को सरकारी नौकरी, एडमिट कार्ड, परीक्षा परिणाम, छात्रवृत्ति तथा विश्वविद्यालय प्रवेश से जुड़ी 100% प्रामाणिक व सत्यापित जानकारी प्रदान करने हेतु प्रतिबद्ध है। हमारा केंद्र कैमूर (बिहार) में भी छात्रों की सहायता हेतु सक्रिय है।"
                            else
                                "Digital Dost Centre (DDC) is dedicated to providing verified government job alerts, admit cards, exam results, scholarships, and university admission updates for students in Bihar and across India.",
                            style = MaterialTheme.typography.bodyMedium,
                            lineHeight = 20.sp
                        )
                    }
                }
            }

            // Student Tools Item
            item {
                SettingsActionRow(
                    icon = Icons.Default.Calculate,
                    title = if (isHindi) "विद्यार्थी टूल्स (आयु व फोटो कैलकुलेटर)" else "Student Tools (Age & Photo Calculator)",
                    subtitle = if (isHindi) "कटऑफ तिथि अनुसार उम्र व फोटो साइज निकालें" else "Calculate exact age and photo dimensions",
                    onClick = onToolsClick
                )
            }

            // Language Toggle
            item {
                SettingsActionRow(
                    icon = Icons.Default.Translate,
                    title = if (isHindi) "भाषा बदलें (Language)" else "Change Language",
                    subtitle = if (isHindi) "वर्तमान भाषा: हिंदी (English में बदलें)" else "Current: English (Switch to Hindi)",
                    onClick = onLanguageToggle
                )
            }

            // Official Website
            item {
                SettingsActionRow(
                    icon = Icons.Default.Language,
                    title = if (isHindi) "वेबसाइट खोलें" else "Visit Website",
                    subtitle = "https://digitaldostcenter.online",
                    onClick = {
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://digitaldostcenter.online"))
                        context.startActivity(intent)
                    }
                )
            }

            // Share App
            item {
                SettingsActionRow(
                    icon = Icons.Default.Share,
                    title = if (isHindi) "ऐप शेयर करें" else "Share Application",
                    subtitle = if (isHindi) "दोस्तों एवं सहपाठियों के साथ साझा करें" else "Share DDC app with fellow aspirants",
                    onClick = {
                        val shareIntent = Intent(Intent.ACTION_SEND).apply {
                            type = "text/plain"
                            putExtra(
                                Intent.EXTRA_TEXT,
                                "डिजिटल दोस्त सेन्टर (DDC) ऐप डाउनलोड करें - बिहार एवं भारत के सभी सरकारी नौकरी, एडमिट कार्ड और रिजल्ट अपडेट्स तुरंत पाएं: https://digitaldostcenter.online"
                            )
                        }
                        context.startActivity(Intent.createChooser(shareIntent, "Share DDC App"))
                    }
                )
            }

            // Contact & Helpdesk
            item {
                SettingsActionRow(
                    icon = Icons.Default.Email,
                    title = if (isHindi) "सहायता एवं संपर्क" else "Helpdesk & Contact",
                    subtitle = "digitaldostcenter@gmail.com · कैमूर, बिहार",
                    onClick = {
                        val emailIntent = Intent(Intent.ACTION_SENDTO).apply {
                            data = Uri.parse("mailto:digitaldostcenter@gmail.com")
                            putExtra(Intent.EXTRA_SUBJECT, "DDC App Inquiry")
                        }
                        context.startActivity(emailIntent)
                    }
                )
            }

            // Privacy Policy & Disclaimer
            item {
                SettingsActionRow(
                    icon = Icons.Default.Policy,
                    title = if (isHindi) "गोपनीयता नीति एवं अस्वीकरण (Disclaimer)" else "Privacy Policy & Disclaimer",
                    subtitle = if (isHindi) "DDC कभी भी असत्यापित या भ्रामक आंकड़े प्रदर्शित नहीं करता।" else "Verified portal links only. No false information.",
                    onClick = {
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://digitaldostcenter.online/privacy-policy"))
                        context.startActivity(intent)
                    }
                )
            }
        }
    }
}

@Composable
fun SettingsActionRow(
    icon: ImageVector,
    title: String,
    subtitle: String,
    onClick: () -> Unit
) {
    OutlinedCard(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(12.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(26.dp)
            )
            Spacer(modifier = Modifier.width(14.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(text = title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                Spacer(modifier = Modifier.height(2.dp))
                Text(text = subtitle, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            Icon(
                imageVector = Icons.Default.ChevronRight,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}
