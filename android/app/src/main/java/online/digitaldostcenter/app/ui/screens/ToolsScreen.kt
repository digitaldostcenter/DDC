package online.digitaldostcenter.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Calculate
import androidx.compose.material.icons.filled.PhotoCamera
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import online.digitaldostcenter.app.ui.viewmodel.AppLanguage
import java.time.LocalDate
import java.time.Period
import java.time.format.DateTimeFormatter

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ToolsScreen(
    language: AppLanguage,
    onBackClick: () -> Unit
) {
    val isHindi = language == AppLanguage.HINDI

    var birthYear by remember { mutableStateOf("2000") }
    var birthMonth by remember { mutableStateOf("01") }
    var birthDay by remember { mutableStateOf("01") }

    var cutoffYear by remember { mutableStateOf("2026") }
    var cutoffMonth by remember { mutableStateOf("08") }
    var cutoffDay by remember { mutableStateOf("01") }

    var calculationResult by remember { mutableStateOf<String?>(null) }

    fun calculateAge() {
        try {
            val by = birthYear.toInt()
            val bm = birthMonth.toInt()
            val bd = birthDay.toInt()

            val cy = cutoffYear.toInt()
            val cm = cutoffMonth.toInt()
            val cd = cutoffDay.toInt()

            val dob = LocalDate.of(by, bm, bd)
            val cut = LocalDate.of(cy, cm, cd)

            val period = Period.between(dob, cut)
            calculationResult = if (isHindi) {
                "${period.years} वर्ष, ${period.months} माह, ${period.days} दिन"
            } else {
                "${period.years} Years, ${period.months} Months, ${period.days} Days"
            }
        } catch (e: Exception) {
            calculationResult = if (isHindi) "कृपया सही तारीख प्रविष्ट करें" else "Please enter valid date numbers"
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = if (isHindi) "विद्यार्थी टूल्स (DDC Tools)" else "DDC Student Tools",
                        fontWeight = FontWeight.Bold
                    )
                },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Age Calculator Card
            item {
                ElevatedCard(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(14.dp)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Calculate, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = if (isHindi) "आयु कैलकुलेटर (Age Calculator)" else "Sarkari Exam Age Calculator",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold
                            )
                        }
                        Spacer(modifier = Modifier.height(12.dp))

                        Text(
                            text = if (isHindi) "जन्म तिथि (Date of Birth - YYYY/MM/DD):" else "Date of Birth (YYYY/MM/DD):",
                            style = MaterialTheme.typography.bodySmall,
                            fontWeight = FontWeight.Medium
                        )
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            OutlinedTextField(
                                value = birthYear,
                                onValueChange = { if (it.length <= 4) birthYear = it },
                                label = { Text("Year") },
                                modifier = Modifier.weight(1.5f),
                                singleLine = true
                            )
                            OutlinedTextField(
                                value = birthMonth,
                                onValueChange = { if (it.length <= 2) birthMonth = it },
                                label = { Text("Month") },
                                modifier = Modifier.weight(1f),
                                singleLine = true
                            )
                            OutlinedTextField(
                                value = birthDay,
                                onValueChange = { if (it.length <= 2) birthDay = it },
                                label = { Text("Day") },
                                modifier = Modifier.weight(1f),
                                singleLine = true
                            )
                        }

                        Spacer(modifier = Modifier.height(10.dp))

                        Text(
                            text = if (isHindi) "कटऑफ गणना तिथि (Cut-off Date):" else "Cut-off Calculation Date:",
                            style = MaterialTheme.typography.bodySmall,
                            fontWeight = FontWeight.Medium
                        )
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            OutlinedTextField(
                                value = cutoffYear,
                                onValueChange = { if (it.length <= 4) cutoffYear = it },
                                label = { Text("Year") },
                                modifier = Modifier.weight(1.5f),
                                singleLine = true
                            )
                            OutlinedTextField(
                                value = cutoffMonth,
                                onValueChange = { if (it.length <= 2) cutoffMonth = it },
                                label = { Text("Month") },
                                modifier = Modifier.weight(1f),
                                singleLine = true
                            )
                            OutlinedTextField(
                                value = cutoffDay,
                                onValueChange = { if (it.length <= 2) cutoffDay = it },
                                label = { Text("Day") },
                                modifier = Modifier.weight(1f),
                                singleLine = true
                            )
                        }

                        Spacer(modifier = Modifier.height(14.dp))

                        Button(
                            onClick = { calculateAge() },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(8.dp)
                        ) {
                            Text(if (isHindi) "आयु की गणना करें" else "Calculate Exact Age")
                        }

                        if (calculationResult != null) {
                            Spacer(modifier = Modifier.height(12.dp))
                            Surface(
                                color = MaterialTheme.colorScheme.primaryContainer,
                                shape = RoundedCornerShape(8.dp),
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Column(modifier = Modifier.padding(12.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                                    Text(
                                        text = if (isHindi) "आपकी सटीक आयु:" else "Your Exact Age:",
                                        style = MaterialTheme.typography.labelSmall
                                    )
                                    Text(
                                        text = calculationResult ?: "",
                                        style = MaterialTheme.typography.titleMedium,
                                        fontWeight = FontWeight.Bold,
                                        color = MaterialTheme.colorScheme.onPrimaryContainer
                                    )
                                }
                            }
                        }
                    }
                }
            }

            // Photo & Signature Guide
            item {
                OutlinedCard(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(14.dp)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.PhotoCamera, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = if (isHindi) "फोटो व हस्ताक्षर साइज दिशानिर्देश" else "Photo & Signature Guidelines",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold
                            )
                        }
                        Spacer(modifier = Modifier.height(10.dp))
                        Text(
                            text = if (isHindi)
                                "• पासपोर्ट फोटो: 3.5cm x 4.5cm, 20 KB से 50 KB, श्वेत/हल्का बैकग्राउंड।\n• हस्ताक्षर: 10 KB से 20 KB, काली या नीली स्याही, स्पष्ट स्कैन।\n• BPSC एवं CSBC फॉर्म में लाइव वेबकैम फोटो अनिवार्य रहती है।"
                            else
                                "• Passport Photo: 3.5cm x 4.5cm, 20 KB to 50 KB with light background.\n• Signature: 10 KB to 20 KB, clear scan with black/blue pen.\n• Keep scanned copy of 10th marksheet (100-200 KB) ready.",
                            style = MaterialTheme.typography.bodyMedium,
                            lineHeight = 22.sp
                        )
                    }
                }
            }
        }
    }
}
