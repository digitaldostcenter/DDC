package online.digitaldostcenter.app.data.datasource

import online.digitaldostcenter.app.data.model.NotificationItem
import online.digitaldostcenter.app.data.model.Post
import online.digitaldostcenter.app.data.model.PostCategory

object SampleDataProvider {

    val samplePosts: List<Post> = listOf(
        Post(
            id = "bpsc-70th-cce-2026",
            titleHi = "बीपीएससी 70वीं संयुक्त प्रतियोगी परीक्षा (CCE) 2026 - ऑनलाइन आवेदन",
            titleEn = "BPSC 70th Combined Competitive Examination (CCE) 2026 - Online Form",
            category = PostCategory.GOVT_JOBS,
            state = "Bihar",
            publishedDate = "15 Oct 2026",
            lastDate = "18 Nov 2026",
            feeGeneral = "₹600",
            feeReserved = "₹150 (SC/ST/Divyang/Female of Bihar)",
            ageLimit = "20-37 वर्ष (नियमानुसार छूट)",
            qualification = "किसी भी मान्यता प्राप्त विश्वविद्यालय से स्नातक (Graduation Degree)",
            totalVacancies = "1,957 पद",
            applyUrl = "https://onlinebpsc.bihar.gov.in",
            officialUrl = "https://bpsc.bihar.gov.in",
            notificationPdfUrl = "https://bpsc.bihar.gov.in/Advt/NB-2026-70CCE.pdf",
            isDemo = true,
            descriptionHi = "बिहार लोक सेवा आयोग (BPSC) द्वारा 70वीं संयुक्त (प्रारंभिक) प्रतियोगिता परीक्षा हेतु आधिकारिक विज्ञापन जारी किया गया है। इच्छुक एवं योग्य अभ्यर्थी निर्धारित तिथियों के मध्य आधिकारिक पोर्टल पर ऑनलाइन आवेदन कर सकते हैं।",
            descriptionEn = "Bihar Public Service Commission (BPSC) invites online applications for the 70th Combined Competitive Examination. Eligible graduates can register on the official portal.",
            importantDates = listOf(
                "आवेदन प्रारंभ (Apply Start)" to "28 Oct 2026",
                "अंतिम तिथि (Last Date)" to "18 Nov 2026",
                "प्रारंभिक परीक्षा (Prelims Exam)" to "13 Dec 2026"
            ),
            eligibilityPoints = listOf(
                "अभ्यर्थी भारत का नागरिक होना चाहिए।",
                "मान्यता प्राप्त संस्थान से स्नातक डिग्री उत्तीर्ण।",
                "न्यूनतम आयु 20/21/22 वर्ष (पदानुसार) तथा अधिकतम 37 वर्ष (पुरुष सामान्य)।"
            )
        ),
        Post(
            id = "bihar-police-constable-admit-card-2026",
            titleHi = "बिहार पुलिस कांस्टेबल भर्ती 2026 लिखित परीक्षा एडमिट कार्ड जारी",
            titleEn = "Bihar Police CSBC Constable Exam 2026 Admit Card Released",
            category = PostCategory.ADMIT_CARDS,
            state = "Bihar",
            publishedDate = "16 Oct 2026",
            lastDate = "05 Nov 2026 (Exam Date)",
            feeGeneral = "निःशुल्क (डाउनलोड)",
            feeReserved = "निःशुल्क (डाउनलोड)",
            ageLimit = "18-25 वर्ष",
            qualification = "12वीं (इण्टरमीडिएट) उत्तीर्ण",
            totalVacancies = "21,391 पद",
            applyUrl = "https://csbc.bih.nic.in",
            officialUrl = "https://csbc.bih.nic.in",
            notificationPdfUrl = "https://csbc.bih.nic.in/Notice/Exam-AdmitCard-2026.pdf",
            isDemo = true,
            descriptionHi = "केन्द्रीय चयन पर्षद (सिपाही भर्ती) बिहार द्वारा कांस्टेबल लिखित परीक्षा का ई-प्रवेश पत्र (Admit Card) जारी कर दिया गया है। छात्र अपने रजिस्ट्रेशन नंबर अथवा मोबाइल नंबर से डाउनलोड कर सकते हैं।",
            descriptionEn = "Central Selection Board of Constable (CSBC) Bihar has officially released the e-Admit Card for the written recruitment test.",
            importantDates = listOf(
                "एडमिट कार्ड जारी (Admit Card)" to "16 Oct 2026",
                "परीक्षा तिथि (Exam Date)" to "01 & 05 Nov 2026"
            ),
            eligibilityPoints = listOf(
                "प्रवेश पत्र के साथ मूल फोटो पहचान पत्र (आधार/वोटर आईडी) अनिवार्य है।",
                "परीक्षा केंद्र पर 2 पासपोर्ट साइज नवीनतम फोटो ले जाना आवश्यक है।"
            )
        ),
        Post(
            id = "bihar-post-matric-scholarship-2026",
            titleHi = "बिहार पोस्ट मैट्रिक स्कॉलरशिप (PMS) 2026-27 - छात्रवृत्ति आवेदन प्रारंभ",
            titleEn = "Bihar Post Matric Scholarship (PMS) 2026-27 - Apply Online",
            category = PostCategory.SCHOLARSHIPS,
            state = "Bihar",
            publishedDate = "12 Oct 2026",
            lastDate = "30 Nov 2026",
            feeGeneral = "₹0 (निःशुल्क)",
            feeReserved = "₹0 (निःशुल्क)",
            ageLimit = "कोई अधिकतम आयु सीमा नहीं",
            qualification = "मैट्रिक के बाद उच्च शिक्षा (Inter/UG/PG/Diploma/ITI/B.Tech)",
            totalVacancies = "समस्त पात्र विद्यार्थी (BC, EBC, SC, ST)",
            applyUrl = "https://pmsonline.bih.nic.in",
            officialUrl = "https://pmsonline.bih.nic.in",
            notificationPdfUrl = "https://pmsonline.bih.nic.in/Guidelines-2026.pdf",
            isDemo = true,
            descriptionHi = "शिक्षा विभाग बिहार सरकार द्वारा पिछड़ा वर्ग, अत्यंत पिछड़ा वर्ग, अनुसूचित जाति एवं जनजाति के छात्र-छात्राओं हेतु पोस्ट मैट्रिक छात्रवृत्ति पोर्टल पर ऑनलाइन आवेदन आमंत्रित किए गए हैं।",
            descriptionEn = "Education Department, Government of Bihar invites applications from BC, EBC, SC and ST students studying in post-matriculation courses.",
            importantDates = listOf(
                "आवेदन प्रारंभ (Opening Date)" to "15 Oct 2026",
                "अंतिम तिथि (Closing Date)" to "30 Nov 2026"
            ),
            eligibilityPoints = listOf(
                "बिहार राज्य का स्थाई निवासी होना अनिवार्य है।",
                "पारिवारिक वार्षिक आय ₹3,00,000/- से कम होनी चाहिए।",
                "कॉलेज/संस्थान मान्यता प्राप्त और बोनाफाइड सर्टिफिकेट जारी करता हो।"
            )
        ),
        Post(
            id = "patna-university-ug-admission-2026",
            titleHi = "पटना विश्वविद्यालय (PU) 4-वर्षीय स्नातक (UG) प्रवेश मेरिट लिस्ट जारी",
            titleEn = "Patna University 4-Year UG Regular Admission 2026 - Merit List",
            category = PostCategory.ADMISSIONS,
            state = "Bihar",
            publishedDate = "14 Oct 2026",
            lastDate = "25 Oct 2026 (Counseling)",
            feeGeneral = "₹1,100 (काउंसलिंग शुल्क)",
            feeReserved = "₹1,100",
            ageLimit = "नियमानुसार",
            qualification = "12वीं (इण्टरमीडिएट) न्यूनतम 45% अंकों सहित",
            totalVacancies = "4,500 सीटें",
            applyUrl = "https://pup.ac.in",
            officialUrl = "https://pup.ac.in",
            notificationPdfUrl = "https://pup.ac.in/notice/merit-list-ug-2026.pdf",
            isDemo = true,
            descriptionHi = "पटना यूनिवर्सिटी ने सत्र 2026-30 के लिए 4 वर्षीय सीबीसीएस (CBCS) स्नातक पाठ्यक्रमों में प्रवेश हेतु प्रथम मेरिट सूची जारी कर दी है। चयनित छात्र आवंटित कॉलेज में दस्तावेज सत्यापन कराएं।",
            descriptionEn = "Patna University has officially released the first round merit list for 4-year undergraduate degree admissions.",
            importantDates = listOf(
                "मेरिट सूची जारी" to "14 Oct 2026",
                "दस्तावेज सत्यापन एवं शुल्क" to "18-25 Oct 2026"
            ),
            eligibilityPoints = listOf(
                "12वीं कक्षा में संबंधित संकाय में न्यूनतम 45% प्राप्तांक।",
                "आवंटन पत्र (Allotment Letter) और मूल प्रमाण पत्र अनिवार्य।"
            )
        ),
        Post(
            id = "ssc-gd-constable-result-2026",
            titleHi = "एसएससी जीडी कांस्टेबल (SSC GD) भर्ती परीक्षा फाइनल रिजल्ट घोषित",
            titleEn = "Staff Selection Commission SSC GD Constable 2026 Final Result Out",
            category = PostCategory.RESULTS,
            state = "All India",
            publishedDate = "16 Oct 2026",
            lastDate = "-",
            feeGeneral = "निःशुल्क",
            feeReserved = "निःशुल्क",
            ageLimit = "18-23 वर्ष",
            qualification = "10वीं (हाईस्कूल) उत्तीर्ण",
            totalVacancies = "26,146 पद",
            applyUrl = "https://ssc.gov.in",
            officialUrl = "https://ssc.gov.in",
            notificationPdfUrl = "https://ssc.gov.in/result/gd-constable-2026.pdf",
            isDemo = true,
            descriptionHi = "कर्मचारी चयन आयोग (SSC) द्वारा सीएपीएफ, एसएसएफ एवं राइफलमैन (जीडी) असम राइफल्स परीक्षा का अंतिम परिणाम और कट-ऑफ अंक जारी कर दिया गया है।",
            descriptionEn = "Staff Selection Commission has announced the final merit results and category-wise cut-off scores for CAPF GD Constable.",
            importantDates = listOf(
                "रिजल्ट घोषित" to "16 Oct 2026",
                "स्कोरकार्ड लिंक सक्रिय" to "20 Oct 2026"
            ),
            eligibilityPoints = listOf(
                "चयनित उम्मीदवारों को आगामी मेडिकल एवं जॉइनिंग लेटर डाक व ईमेल द्वारा भेजे जाएंगे।"
            )
        ),
        Post(
            id = "rrb-technician-answer-key-2026",
            titleHi = "रेलवे भर्ती बोर्ड (RRB) तकनीशियन ग्रेड 1 एवं 3 उत्तर कुंजी व आपत्ति दर्ज",
            titleEn = "Railway Recruitment Board (RRB) Technician Answer Key & Objection",
            category = PostCategory.ANSWER_KEYS,
            state = "All India",
            publishedDate = "15 Oct 2026",
            lastDate = "22 Oct 2026 (Objection)",
            feeGeneral = "₹50 प्रति प्रश्न आपत्ति",
            feeReserved = "₹50 प्रति प्रश्न आपत्ति",
            ageLimit = "18-36 वर्ष",
            qualification = "10वीं + ITI / 12वीं PCM / डिप्लोमा / डिग्री",
            totalVacancies = "9,144 पद",
            applyUrl = "https://rrbapply.gov.in",
            officialUrl = "https://indianrailways.gov.in",
            notificationPdfUrl = "https://rrbcdg.gov.in/notice/technician-answerkey.pdf",
            isDemo = true,
            descriptionHi = "आरआरबी तकनीशियन सीबीटी परीक्षा की आधिकारिक उत्तर कुंजी एवं प्रश्न पत्र जारी कर दिया गया है। अभ्यर्थी उत्तरों की जांच कर 22 अक्टूबर तक ऑनलाइन आपत्ति दर्ज कर सकते हैं।",
            descriptionEn = "Railway Recruitment Boards have published the provisional answer key for the Technician Grade 1 & 3 Computer Based Test.",
            importantDates = listOf(
                "उत्तर कुंजी उपलब्ध" to "15 Oct 2026",
                "आपत्ति दर्ज करने की अंतिम तिथि" to "22 Oct 2026"
            ),
            eligibilityPoints = listOf(
                "यदि प्रश्न पर आपत्ति सही पाई जाती है तो आपत्ति शुल्क वापस कर दिया जाएगा।"
            )
        ),
        Post(
            id = "bihar-student-credit-card-2026",
            titleHi = "बिहार स्टूडेंट क्रेडिट कार्ड योजना - ₹4 लाख तक का शिक्षा ऋण 0-1% ब्याज पर",
            titleEn = "Bihar Student Credit Card Scheme - Higher Education Loan up to ₹4 Lakh",
            category = PostCategory.GOVT_SCHEMES,
            state = "Bihar",
            publishedDate = "10 Oct 2026",
            lastDate = "वर्षभर चालू (Always Open)",
            feeGeneral = "₹0 (निःशुल्क)",
            feeReserved = "₹0 (निःशुल्क)",
            ageLimit = "अधिकतम 25 वर्ष (नामांकन समय)",
            qualification = "12वीं उत्तीर्ण छात्र जो मान्यता प्राप्त कॉलेज में नामांकित हैं",
            totalVacancies = "सभी पात्र बिहार निवासी छात्र",
            applyUrl = "https://www.7nishchay-yuvaupmission.bihar.gov.in",
            officialUrl = "https://mnssby.bihar.gov.in",
            notificationPdfUrl = "https://mnssby.bihar.gov.in/scheme-guideline.pdf",
            isDemo = true,
            descriptionHi = "बिहार सरकार के सात निश्चय अंतर्गत आर्थिक हल, युवाओं को बल के तहत उच्च शिक्षा हेतु विद्यार्थियों को अधिकतम 4 लाख रुपये तक का शिक्षा ऋण अत्यंत रियायती दर (छात्राओं व दिव्यांगों को 1% तथा छात्रों को 4%) पर उपलब्ध कराया जाता है।",
            descriptionEn = "Government of Bihar's flagship education loan scheme offering financial assistance up to Rs 4 Lakhs for general and technical degree programs.",
            importantDates = listOf(
                "आवेदन प्रक्रिया" to "ऑनलाइन निरंतर चालू",
                "डीआरसीसी सत्यापन" to "आवेदन के उपरांत संबंधित जिले में"
            ),
            eligibilityPoints = listOf(
                "आवेदक बिहार का मूल निवासी होना अनिवार्य है।",
                "मान्यता प्राप्त संस्थान में उच्च शिक्षा पाठ्यक्रम में प्रवेश लिया हो।"
            )
        )
    )

    val sampleNotifications: List<NotificationItem> = listOf(
        NotificationItem(
            id = "notif-1",
            titleHi = "बीपीएससी 70वीं संयुक्त परीक्षा - आवेदन सूचना",
            titleEn = "BPSC 70th CCE - Application Notice",
            messageHi = "BPSC 70वीं संयुक्त प्रतियोगिता परीक्षा के 1957 पदों पर आवेदन प्रारंभ होने वाले हैं। विवरण देखें।",
            messageEn = "Applications opening soon for 1957 posts in BPSC 70th CCE. Check details.",
            timestamp = "15 मिनट पूर्व (15m ago)",
            isRead = false,
            targetPostId = "bpsc-70th-cce-2026",
            category = PostCategory.GOVT_JOBS
        ),
        NotificationItem(
            id = "notif-2",
            titleHi = "बिहार पुलिस सिपाही परीक्षा एडमिट कार्ड जारी",
            titleEn = "Bihar Police Constable Admit Card Released",
            messageHi = "CSBC ने 21,391 सिपाही पदों की परीक्षा का प्रवेश पत्र जारी किया। अभी डाउनलोड करें।",
            messageEn = "CSBC released exam admit cards for 21,391 constable posts. Download now.",
            timestamp = "2 घंटे पूर्व (2h ago)",
            isRead = false,
            targetPostId = "bihar-police-constable-admit-card-2026",
            category = PostCategory.ADMIT_CARDS
        ),
        NotificationItem(
            id = "notif-3",
            titleHi = "बिहार पोस्ट मैट्रिक छात्रवृत्ति पोर्टल खुला",
            titleEn = "Bihar Post Matric Scholarship Portal Live",
            messageHi = "सत्र 2026-27 के लिए छात्रवृत्ति आवेदन प्रारंभ हो चुके हैं। अंतिम तिथि 30 नवंबर।",
            messageEn = "Applications are now live for session 2026-27. Last date is 30 November.",
            timestamp = "कल (Yesterday)",
            isRead = true,
            targetPostId = "bihar-post-matric-scholarship-2026",
            category = PostCategory.SCHOLARSHIPS
        )
    )
}
