import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Map as MapIcon, List, ChevronDown, ChevronUp, MapPin, Filter, Zap, MonitorPlay, Megaphone, Coffee, Utensils, AlertCircle, Download, Upload, Info, Lock } from 'lucide-react';

// ==========================================
// 1. 預設專題資料庫 (作為基底)
// ==========================================
const initialProjectsData = [
  { id: "21", name: "孩有AI", nameEn: "AI for Every Child", course: "人工智慧實務專題", courseEn: "Special Topics in AI Applications", instructor: "吳致勳", needsPower: false },
  { id: "22", name: "木境傳說", nameEn: "Muzha Legend", course: "人工智慧實務專題", courseEn: "Special Topics in AI Applications", instructor: "吳致勳", needsPower: false },
  { id: "23", name: "AgriCarbon", nameEn: "AgriCarbon", course: "人工智慧實務專題", courseEn: "Special Topics in AI Applications", instructor: "吳致勳", needsPower: false },
  { id: "24", name: "Open NCCU 畢業檢核", nameEn: "Open NCCU Graduation Requirement Verification System", course: "Open NCCU", courseEn: "", instructor: "無", needsPower: true },
  { id: "25", name: "基於因果經濟學感知神經網路的序列推薦系統: CEINN", nameEn: "CEINN: Causal Economics-Informed Neural Networks for Sequential Recommendation", course: "機器學習觀念與應用", courseEn: "Machine Learning : Concepts and Applications", instructor: "魏綾音", needsPower: true },
  { id: "26", name: "消費數據分析 發票背後的故事", nameEn: "Consumer Data Analytics: The Story Behind Receipts", course: "資料科學", courseEn: "Data Science", instructor: "張家銘", needsPower: false },
  { id: "27", name: "基於 GDELT 全球事件資料庫之國際事件趨勢分析與預測", nameEn: "International Event Trend Analysis and Forecasting Based on the GDELT Global Events Database", course: "資料科學", courseEn: "Data Science", instructor: "張家銘", needsPower: false },
  { id: "28", name: "電影評分、類型與票房表現分析", nameEn: "Analysis of Movie Ratings, Genres, and Box Office Performance", course: "資料科學", courseEn: "Data Science", instructor: "張家銘", needsPower: false },
  { id: "29", name: "The Moneyball Blueprint: 運用機器學習打造大聯盟球員軌跡預測、相似度分群與陣容勝率模擬", nameEn: "The Moneyball Blueprint: Applying Machine Learning to MLB Player Trajectory Prediction, Similarity Clustering, and Lineup Win Probability Simulation", course: "資料科學", courseEn: "Data Science", instructor: "張家銘", needsPower: false },
  { id: "30", name: "房價趨勢與熱門成交物件特徵分析", nameEn: "Housing Price Trends and Analysis of Popular Property Transaction Features", course: "資料科學", courseEn: "Data Science", instructor: "張家銘", needsPower: false },
  { id: "31", name: "從位置到多元球風：現代 NBA 球員角色分析", nameEn: "From Positions to Playing Styles: An Analysis of Modern NBA Player Roles", course: "資料科學", courseEn: "Data Science", instructor: "張家銘", needsPower: false },
  { id: "32", name: "YouBike 站點投放與缺車率的空間相關性分析", nameEn: "Spatial Correlation Analysis of YouBike Station Deployment and Bicycle Shortage Rates", course: "資料科學", courseEn: "Data Science", instructor: "張家銘", needsPower: false },
  { id: "33", name: "基於比賽情境的中華職棒打席結果預測", nameEn: "Context-Aware Plate Appearance Outcome Prediction in the Chinese Professional Baseball League (CPBL)", course: "資料科學", courseEn: "Data Science", instructor: "張家銘", needsPower: false },
  { id: "34", name: "未定", nameEn: "TBD", course: "計算思維與人工智慧", courseEn: "Computational Thinking and AI", instructor: "陳昭伶", needsPower: false },
  { id: "35", name: "未定", nameEn: "TBD", course: "計算思維與人工智慧", courseEn: "Computational Thinking and AI", instructor: "陳昭伶", needsPower: false },
  { id: "36", name: "未定", nameEn: "TBD", course: "計算思維與人工智慧", courseEn: "Computational Thinking and AI", instructor: "陳昭伶", needsPower: false },
  { id: "37", name: "未定", nameEn: "TBD", course: "計算思維與人工智慧", courseEn: "Computational Thinking and AI", instructor: "陳昭伶", needsPower: false },
  { id: "38", name: "AI Mentor 全方位學習引導教練", nameEn: "AI Mentor: Your Comprehensive Learning Navigator", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "39", name: "澎湖 AI 導遊", nameEn: "Penghu AI Tour Guide", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "40", name: "Agent x MCP 支付建議服務模組設計與實作", nameEn: "Design and Implementation of an Agentic MCP-Based Payment Recommendation Service", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "41", name: "企業決策支援平台：營運戰情 Multi-Agent 與人資規章 RAG QA Bot", nameEn: "Enterprise Decision AI: Operations War Room Multi-Agent and HR Policy RAG QA Bot", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "42", name: "原寶：原資 AI 智慧服務機器人", nameEn: "YuanBao: Indigenous Affairs AI Service Assistant", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "43", name: "自動化合規審查⽣成系統", nameEn: "Automated Compliance Review and Report Generation System", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "44", name: "政大智慧輿情系統", nameEn: "NCCU Intelligence Public Opinion System", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "45", name: "政大學習嚮導聊天機器人——小哆啦", nameEn: "NCCU Learning Guide Chatbot - Dora", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "46", name: "智慧代理人之多場景應用研究：資料庫交互、瀏覽器自動化與模型自動化評測", nameEn: "Research on Multi-Scenario Applications of AI Agents: Database Interaction, Browser Automation, and Automated Model Evaluation", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "47", name: "商品開發AI小幫手", nameEn: "AI Assistant for Product Development", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "48", name: "RoleLab 職涯角色實驗室", nameEn: "RoleLab: Career Exploration and Role Development Platform", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "49", name: "企業多雲GenAI安全分析\n與研究", nameEn: "Multi-Cloud Security AI Platform", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "50", name: "半自動化股東年報核對系統", nameEn: "Semi-automated shareholder annual report verification system", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "51", name: "凱基金融控股股份有限公司", nameEn: "Advanced Legal RAG system", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "52", name: "泛科知識股份有限公司-AI 賦能科普敘事：雙軌科普腳本自動化引擎", nameEn: "PanMedia - AI-Powered Science Narrative: Dual-Track Science Script Automation Engine", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "53", name: "國泰金控：HR職務再設計－AI x 流程優化與知識管理", nameEn: "Cathay Financial Holdings: HR Operations Redesign — Workflow Optimization and AI-Powered Knowledge Management", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "54", name: "TVBS AI 數據策略平台", nameEn: "TVBS AI Data Strategy Platform", course: "生成式 AI 應用與倫理實務課程\tGenerative AI Applications and Ethics Practicum", courseEn: "", instructor: "陳政輝", needsPower: true },
  { id: "55", name: "跌倒偵測警報系統", nameEn: "Fall Detection Alert System", course: "計算思維與人工智慧", courseEn: "Computational Thinking and AI", instructor: "吳致勳", needsPower: false },
  { id: "56", name: "預測通勤方式與永續意識：以政大創新國際學院學生為例之前導研究", nameEn: "Predicting Commuting Modes and Sustainability Awareness: A Pilot Study of ICI Students at NCCU", course: "計算思維與人工智慧", courseEn: "Computational Thinking and AI", instructor: "吳致勳", needsPower: false },
  { id: "57", name: "利用 RapidMiner 挖掘大學宿舍能源消費習慣與節能意識", nameEn: "Analyzing Energy Usage Awareness in University Dormitories Using RapidMiner", course: "計算思維與人工智慧", courseEn: "Computational Thinking and AI", instructor: "吳致勳", needsPower: false },
  { id: "58", name: "利用 RapidMiner 分析 NCCU 學生壓力和睡眠質量", nameEn: "Analyzing NCCU Students’ Stress and Sleep Quality Using RapidMiner", course: "計算思維與人工智慧", courseEn: "Computational Thinking and AI", instructor: "吳致勳", needsPower: false },
  { id: "59", name: "AI 輔助學習對學生學業表現的影響(RapidMiner)", nameEn: "The Impact of AI-Assisted Learning on Student Academic Performance (RapidMiner)", course: "計算思維與人工智慧", courseEn: "Computational Thinking and AI", instructor: "吳致勳", needsPower: false },
  { id: "60", name: "人工智慧與未來就業：學生如何看待工作自動化", nameEn: "AI and the Future of Employment: How Students Perceive Job Automation", course: "計算思維與人工智慧", courseEn: "Computational Thinking and AI", instructor: "吳致勳", needsPower: false },
  { id: "61", name: "應用人工智慧於弱勢社區飲用水安全評估之分類模型建構", nameEn: "AI-Driven Drinking-Water Safety Classifier for Underserved Communities", course: "計算思維與人工智慧", courseEn: "Computational Thinking and AI", instructor: "吳致勳", needsPower: false },
  { id: "62", name: "AI跨域-AI 眼動評量的倫理風險", nameEn: "AI Interdisciplinary-Ethical Risks of AI-Based Eye-Tracking Assessments", course: "國立臺中科技大學人工智慧倫理", courseEn: "AI Ethics/National Taichung University of Science and Technology (NTUST)", instructor: "曾建維", needsPower: false },
  { id: "63", name: "AI 專注力偵測學習助手", nameEn: "AI Attention-Detection Learning Assistant", course: "計算思維與人工智慧應用導論", courseEn: "Computational Thinking and Introduction to AI", instructor: "吳怡潔", needsPower: false },
  { id: "64", name: "AI互動式學習平台 費曼學習法 X AI：基於大型語言模型的智慧自適應導學與知識盲點診斷系統", nameEn: "Feynman Learning Technique × AI: An Intelligent Adaptive Tutoring and Knowledge Blind Spot Diagnosis System Based on Large Language Models", course: "計算思維與人工智慧應用導論", courseEn: "Computational Thinking and Introduction to AI", instructor: "吳怡潔", needsPower: false },
  { id: "65", name: "AI 讀書坐姿建議系統", nameEn: "AI Study Posture Recommendation System", course: "計算思維與人工智慧應用導論", courseEn: "Computational Thinking and Introduction to AI", instructor: "吳怡潔", needsPower: false },
  { id: "66", name: "AI輿論風向分析", nameEn: "AI Public Opinion Trend Analysis", course: "計算思維與人工智慧應用導論", courseEn: "Computational Thinking and Introduction to AI", instructor: "吳怡潔", needsPower: false },
  { id: "67", name: "AI生成的專屬形象", nameEn: "AI generated personalized avatar", course: "計算思維與人工智慧應用導論", courseEn: "Computational Thinking and Introduction to AI", instructor: "吳怡潔", needsPower: false },
  { id: "68", name: "台股資料平台與 AI 投資研究系統", nameEn: "Taiwan Stock Data Platform & AI Investment Research System", course: "計算思維與人工智慧應用導論", courseEn: "Computational Thinking and Introduction to AI", instructor: "吳怡潔", needsPower: false },
  { id: "69", name: "AI 音樂推薦系統", nameEn: "AI Music Recommendation System", course: "計算思維與人工智慧應用導論", courseEn: "Computational Thinking and Introduction to AI", instructor: "吳怡潔", needsPower: false },
  { id: "70", name: "基於符號圖與拉普拉斯正則化於樹結構之金融詐騙偵測", nameEn: "Financial Fraud Detection Based on Dynamic Signed Graph, Laplacian Regularization and Gradient Boosting", course: "人工智慧實務專題", courseEn: "Special Topics in AI Applications", instructor: "陳昭伶", needsPower: true },
  { id: "71", name: "基於RAG及大語言模型合約小幫手", nameEn: "Contract Assistant Based on RAG and Large Language Models", course: "人工智慧實務專題", courseEn: "Special Topics in AI Applications", instructor: "陳昭伶", needsPower: false },
  { id: "72", name: "智慧論文文獻引用查核系統", nameEn: "Intelligence Academic Citation Verification System", course: "人工智慧實務專題", courseEn: "Special Topics in AI Applications", instructor: "陳昭伶", needsPower: false },
  { id: "73", name: "Zenbo 智遊政大：情緒支持互動回饋校園導覽助理", nameEn: "Zenbo Intelligent Tour Guide in NCCU: Campus Tour Assistant with Emotional Support and Interactive Feedback", course: "人工智慧實務專題", courseEn: "Special Topics in AI Applications", instructor: "陳昭伶", needsPower: true },
  { id: "74", name: "Re:space 智慧斷捨離決策支援系統", nameEn: "Re:space Intelligence Decluttering Decision Support System", course: "人工智慧實務專題", courseEn: "Special Topics in AI Applications", instructor: "陳昭伶", needsPower: false },
  { id: "75", name: "日常娛樂互動機器人", nameEn: "Daily Interactive Entertainment Robot", course: "人工智慧實務專題", courseEn: "Special Topics in AI Applications", instructor: "陳昭伶", needsPower: true },
  { id: "76", name: "結合語音分析與大型語言模型之華語二語學習者分辨與糾錯系統", nameEn: "A Mandarin Second Language Learner Discrimination and Error Correction System Combining Speech Analysis and Large Language Models", course: "人工智慧實務專題", courseEn: "Special Topics in AI Applications", instructor: "吳怡潔", needsPower: false },
  { id: "77", name: "從「玲瓏」雜誌史料追踨性別議題趨勢", nameEn: "Tracing Gender Issue Trends Through Historical Archives of \"Linglong\" Magazine", course: "人工智慧實務專題", courseEn: "Special Topics in AI Applications", instructor: "吳怡潔", needsPower: false },
  { id: "78", name: "基於多模態深度學習模型的歷史文件知識抽取技術", nameEn: "Knowledge Extraction from Historical Documents Based on  Deep Learning Multimodal Models", course: "人工智慧實務專題", courseEn: "Special Topics in AI Applications", instructor: "吳怡潔", needsPower: false },
  { id: "79", name: "AI生成廣告圖像之視覺變因與受眾偏好研究——以品牌辨識與排序評選為分析核心", nameEn: "Visual Variables and Audience Preferences in AI-Generated Advertising Images An Analysis Based on Brand Recognition and Preference Ranking", course: "人工智慧實務專題", courseEn: "Special Topics in AI Applications", instructor: "吳怡潔", needsPower: false },
  { id: "80", name: "全自動短影片產製框架於SNS的觀眾偏好研究", nameEn: "A Study on Audience Preferences for Fully Automated Short Video Production Frameworks on Social Networking Services", course: "人工智慧實務專題", courseEn: "Special Topics in AI Applications", instructor: "吳怡潔", needsPower: false },
  { id: "81", name: "基於強化學習之 SLAM 路徑規劃系統", nameEn: "RL-driven Autonomous Route Planning in SLAM Environments", course: "人工智慧實務專題", courseEn: "Special Topics in AI Applications", instructor: "吳怡潔", needsPower: false },
  { id: "82", name: "設計思考與人工智慧-低資源籃球隊影片投籃事件索引工具", nameEn: "DTAI-Shot Event Indexing Tool for Low-Resource Basketball Team", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: true },
  { id: "83", name: "設計思考與人工智慧-讓 AI 幫你偷聽市場－基於 BERT 語意分群的智慧 TA 洞察系統", nameEn: "DTAI-AI-Powered Market Listening: A Smart TA Insight System Using BERT Semantic Clustering", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: true },
  { id: "84", name: "設計思考與人工智慧-threads貼文情緒分析插件", nameEn: "DTAI-Threads Post Sentiment Analysis Tool", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: true },
  { id: "85", name: "設計思考與人工智慧-如何利用AI影像辨識分析台灣美食，協助判斷每日飲食是否均衡？", nameEn: "DTAI-How can AI image recognition analyze Taiwanese food and help determine whether our daily diet is balanced", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: true },
  { id: "86", name: "設計思考與人工智慧-政大餐廳排隊決策輔助系統", nameEn: "DTAI-Dining Queue Decision Support System at NCCU", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: true },
  { id: "87", name: "設計思考與人工智慧-履歷與職缺智慧配對系統", nameEn: "DTAI-Intelligent Talent Acquisition System", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: true },
  { id: "88", name: "設計思考與人工智慧-一夕暴富：基於機器學習與深度神經網絡的短線跳空預測模型", nameEn: "DTAI-​Rich Overnight: A Machine Learning and Deep Neural Network Approach to Short-Term Gap Prediction", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: true },
  { id: "89", name: "設計思考與人工智慧-解決大學生職涯發展迷惘之選課推薦模型", nameEn: "DTAI-Navigating Career Uncertainty: A Course Recommendation Model for College Students", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: true },
  { id: "90", name: "設計思考與人工智慧-為內容創作者打造的 Threads 爆文預測系統", nameEn: "DTAI-For Content Creators: A Threads Virality Prediction System Using Design Thinking and Artificial Intelligence", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: true },
  { id: "91", name: "設計思考與人工智慧－基於影像辨識的農作物病蟲害診斷系統", nameEn: "DTAI-An Image Recognition-Based Crop Pest and Disease Diagnosis System", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: true },
  { id: "92", name: "設計思考與人工智慧-我是小廚神：基於電腦視覺之食材效期動態監控與料理決策支援系統", nameEn: "DTAI-A Computer Vision System for Ingredient Shelf-Life Tracking and Cooking Decision Support", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: true },
  { id: "93", name: "設計思考與人工智慧-校園資訊管理助手", nameEn: "DTAI-Campus Information Management Assistant", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: true },
  { id: "94", name: "設計思考與人工智慧-皮膚症狀影像辨識系統", nameEn: "DTAI-Skin Disease Image Recognition System", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: false },
  { id: "95", name: "設計思考與人工智慧-廢片偵測器：結合多場景特徵之廢片判定系統", nameEn: "DTAI-Unusable Photo Detector: A Multi-Scene Feature-Based Unusable Photo Detection System", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: false },
  { id: "96", name: "設計思考與人工智慧-訓練AI成為社恐友善的即時聊天指南工具", nameEn: "DTAI-​Training AI as a Real-Time Chat Guidance Tool for Socially Anxious Users", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: false },
  { id: "97", name: "設計思考與人工智慧-異常評論檢測器", nameEn: "DTAI- Review Anomaly Detector", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: false },
  { id: "98", name: "設計思考與人工智慧-AI內容偵測器", nameEn: "DTAI-AI Content Detector", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: false },
  { id: "99", name: "設計思考與人工智慧-貓咪臉部表情分析與心情辨識", nameEn: "DTAI-Feline Facial Expression Analysis and Emotion Recognition", course: "設計思考與人工智慧", courseEn: "Design Thinking and AI", instructor: "陳宜秀、蔡炎龍", needsPower: false },
  { id: "100", name: "Analysis of Overseas Travel Preferences and Consumption Patterns", nameEn: "Analysis of Overseas Travel Preferences and Consumption Patterns", course: "大數據與社會分析", courseEn: "Big Data for Social Analysis", instructor: "卞中佩", needsPower: false },
  { id: "101", name: "AI Research Breakthroughs and Financial Market Expectations", nameEn: "AI Research Breakthroughs and Financial Market Expectations", course: "大數據與社會分析", courseEn: "Big Data for Social Analysis", instructor: "卞中佩", needsPower: false },
  { id: "102", name: "The Shopee Effect: Analyzing the Spatiotemporal Correlation between E-Commerce Physical Expansion and Urban Traffic Incidents in Taipei City", nameEn: "The Shopee Effect: Analyzing the Spatiotemporal Correlation between E-Commerce Physical Expansion and Urban Traffic Incidents in Taipei City", course: "大數據與社會分析", courseEn: "Big Data for Social Analysis", instructor: "卞中佩", needsPower: false },
  { id: "103", name: "Do Public Services Reduce Daily Shortages in SADC Countries?", nameEn: "Do Public Services Reduce Daily Shortages in SADC Countries?", course: "大數據與社會分析", courseEn: "Big Data for Social Analysis", instructor: "卞中佩", needsPower: false },
  { id: "104", name: "Weather, Gender, & Traffic Accidents: A Localized Spatial Analysis in Taiwan", nameEn: "Weather, Gender, & Traffic Accidents: A Localized Spatial Analysis in Taiwan", course: "大數據與社會分析", courseEn: "Big Data for Social Analysis", instructor: "卞中佩", needsPower: false },
  { id: "105", name: "A Cross-Island Analysis of Air Quality and Respiratory Health in Major Indonesian Cities", nameEn: "A Cross-Island Analysis of Air Quality and Respiratory Health in Major Indonesian Cities", course: "大數據與社會分析", courseEn: "Big Data for Social Analysis", instructor: "卞中佩", needsPower: false },
  { id: "106", name: "Navigating the Shockwave: Assessing Taiwan's Port Resilience and ESG Dynamics Under Geopolitical Oil Fluctuations", nameEn: "Navigating the Shockwave: Assessing Taiwan's Port Resilience and ESG Dynamics Under Geopolitical Oil Fluctuations", course: "大數據與社會分析", courseEn: "Big Data for Social Analysis", instructor: "卞中佩", needsPower: false },
  { id: "107", name: "Selective Identity Marking: An Approach to Media Framing in Crime Headlines", nameEn: "Selective Identity Marking: An Approach to Media Framing in Crime Headlines", course: "大數據與社會分析", courseEn: "Big Data for Social Analysis", instructor: "卞中佩", needsPower: false },
  { id: "108", name: "Spatial Clustering of Muslim-Friendly Tourism Services in Taiwan: The Emergence of Muslim-Friendly Tourism Ecosystems", nameEn: "Spatial Clustering of Muslim-Friendly Tourism Services in Taiwan: The Emergence of Muslim-Friendly Tourism Ecosystems", course: "大數據與社會分析", courseEn: "Big Data for Social Analysis", instructor: "卞中佩", needsPower: false },
  { id: "109", name: "Do Experimental Schools Drive Housing Prices?", nameEn: "Do Experimental Schools Drive Housing Prices?", course: "大數據與社會分析", courseEn: "Big Data for Social Analysis", instructor: "卞中佩", needsPower: false },
  { id: "110", name: "Retail Dynamics Around MRT Stations in Taipei", nameEn: "Retail Dynamics Around MRT Stations in Taipei", course: "大數據與社會分析", courseEn: "Big Data for Social Analysis", instructor: "卞中佩", needsPower: false },
  { id: "111", name: "Fridge Expiry Reminder", nameEn: "Fridge Expiry Reminder", course: "AI 導論", courseEn: "Introduction to AI", instructor: "卞中佩", needsPower: false },
  { id: "112", name: "Air quality interpretation system", nameEn: "Air quality interpretation system", course: "AI 導論", courseEn: "Introduction to AI", instructor: "卞中佩", needsPower: false },
  { id: "113", name: "Library visitors flow data collection", nameEn: "Library visitors flow data collection", course: "AI 導論", courseEn: "Introduction to AI", instructor: "卞中佩", needsPower: true },
  { id: "114", name: "Compass", nameEn: "Compass", course: "AI 導論", courseEn: "Introduction to AI", instructor: "卞中佩", needsPower: true },
  { id: "115", name: "GPA SAVER", nameEn: "GPA SAVER", course: "AI 導論", courseEn: "Introduction to AI", instructor: "卞中佩", needsPower: false },
  { id: "116", name: "Syllabuddy-The Ultimate NCCU Student Survival Guide", nameEn: "Syllabuddy-The Ultimate NCCU Student Survival Guide", course: "AI 導論", courseEn: "Introduction to AI", instructor: "卞中佩", needsPower: false },
  { id: "117", name: "WasteVision", nameEn: "WasteVision", course: "AI 導論", courseEn: "Introduction to AI", instructor: "卞中佩", needsPower: false },
  { id: "118", name: "Personalized Mandarin Reading Learning Assitant", nameEn: "Personalized Mandarin Reading Learning Assitant", course: "AI 導論", courseEn: "Introduction to AI", instructor: "卞中佩", needsPower: true },
  { id: "119", name: "Zhinannumnum", nameEn: "Zhinannumnum", course: "AI 導論", courseEn: "Introduction to AI", instructor: "卞中佩", needsPower: true },
  { id: "120", name: "See-See-U", nameEn: "See-See-U", course: "AI 導論", courseEn: "Introduction to AI", instructor: "卞中佩", needsPower: false },
  { id: "121", name: "News Sentiment Traffic Light", nameEn: "News Sentiment Traffic Light", course: "AI 導論", courseEn: "Introduction to AI", instructor: "卞中佩", needsPower: false },
  { id: "122", name: "統計學（二）-待訂", nameEn: "Statistics II-Tentative Title", course: "統計學", courseEn: "Statistics", instructor: "關秉寅", needsPower: false },
  { id: "123", name: "統計學（二）-線上與實體學習在英文學科之學習成效比較研究", nameEn: "Statistics II-Learning Effectiveness Between Online and In-Person Learning in English Subjects", course: "統計學", courseEn: "Statistics", instructor: "關秉寅", needsPower: false },
  { id: "124", name: "統計學（二）-碳稅政策與人均 GDP 成長率之關係研究", nameEn: "Statistics II-The Relationship Between Carbon Tax Policy and Per Capita GDP Growth Rate", course: "統計學", courseEn: "Statistics", instructor: "關秉寅", needsPower: false },
  { id: "125", name: "統計學（二）-所得、社會信任與孤獨感", nameEn: "Statistics II-Income, Social Trust, and Loneliness", course: "統計學", courseEn: "Statistics", instructor: "關秉寅", needsPower: false },
  { id: "126", name: "統計學（二）-對醫療體系的高信任度在何種程度上預測有害健康行為的增加？", nameEn: "Statistics II-To What Extent Does High Trust in the Healthcare System Predict an Increase in Harmful Health Behaviors?", course: "統計學", courseEn: "Statistics", instructor: "關秉寅", needsPower: false },
  { id: "127", name: "統計學（二）-大學生含糖飲料攝取與壓力水平之相關性研究", nameEn: "Statistics II-The Association Between Sugar-Sweetened Beverage Consumption and Stress Levels Among College Students", course: "統計學", courseEn: "Statistics", instructor: "關秉寅", needsPower: false },
  { id: "128", name: "統計學（二）-待訂", nameEn: "Statistics II-Tentative Title", course: "統計學", courseEn: "Statistics", instructor: "關秉寅", needsPower: false },
  { id: "129", name: "統計學（二）-社群媒體使用對大學生學業表現與睡眠品質之影響研究", nameEn: "Statistics II-The Impact of Social Media Usage on Academic Performance and Sleep Quality among College Students", course: "統計學", courseEn: "Statistics", instructor: "關秉寅", needsPower: false },
  { id: "130", name: "統計學（二）-過去十年 Google 擴大人工智慧資本支出對初階工程師裁員率之影響研究", nameEn: "Statistics II-How Has Google’s Increasing AI-Related Capital Expenditure Affected the Layoff Rate of Entry-Level Engineers Over the Past Ten Years?", course: "統計學", courseEn: "Statistics", instructor: "關秉寅", needsPower: false },
  { id: "131", name: "統計學（二）-睡眠時數與學生生產力之關係研究", nameEn: "Statistics II-THE RELATIONSHIP BETWEEN SLEEP DURATION & STUDENT PRODUCTIVITY", course: "統計學", courseEn: "Statistics", instructor: "關秉寅", needsPower: false },
  { id: "132", name: "統計學（二）-反手拍技術是否影響網球運動表現？", nameEn: "Statistics II-Does Backhand Technique Influence Tennis Performance?", course: "統計學", courseEn: "Statistics", instructor: "關秉寅", needsPower: false },
  { id: "133", name: "統計學（二）-咖啡因攝取、睡眠品質與壓力水平", nameEn: "Statistics II-Caffeine Consumption, Sleep Quality, And Stress Level", course: "統計學", courseEn: "Statistics", instructor: "關秉寅", needsPower: false },
  { id: "134", name: "Improving Retrieval-Augmented Generation via Topic Partitioning", nameEn: "Improving Retrieval-Augmented Generation via Topic Partitioning", course: "生成式", courseEn: "AI實作Capstone: Generative AI", instructor: "呂欣澤", needsPower: true },
  { id: "135", name: "Media Monitoring Bot for Indonesian Citizens in Taiwan", nameEn: "Media Monitoring Bot for Indonesian Citizens in Taiwan", course: "生成式", courseEn: "AI實作Capstone: Generative AI", instructor: "呂欣澤", needsPower: true },
  { id: "136", name: "TopicENA: Enabling Epistemic Network Analysis at Scale through Automated Topic-Based Coding", nameEn: "TopicENA: Enabling Epistemic Network Analysis at Scale through Automated Topic-Based Coding", course: "生成式", courseEn: "AI實作Capstone: Generative AI", instructor: "呂欣澤", needsPower: true },
  { id: "137", name: "高雄市 PM2.5 補值方法互動實驗平台", nameEn: "高雄市 PM2.5 補值方法互動實驗平台", course: "生成式", courseEn: "AI實作Capstone: Generative AI", instructor: "呂欣澤", needsPower: true },
  { id: "138", name: "Digital Self-Efficacy and Learning Outcomes in a Modular Programming Course", nameEn: "Digital Self-Efficacy and Learning Outcomes in a Modular Programming Course", course: "生成式", courseEn: "AI實作Capstone: Generative AI", instructor: "呂欣澤", needsPower: true },
  { id: "139", name: "Alan Turing: a brilliant life, a hidden war, and a tragic truth", nameEn: "Alan Turing: a brilliant life, a hidden war, and a tragic truth", course: "數位人文與AI", courseEn: "Digital Humanities and AI", instructor: "呂欣澤", needsPower: true },
  { id: "140", name: "TBD", nameEn: "TBD", course: "數位人文與AI", courseEn: "Digital Humanities and AI", instructor: "呂欣澤", needsPower: true },
  { id: "141", name: "The Book of Job", nameEn: "The Book of Job", course: "數位人文與AI", courseEn: "Digital Humanities and AI", instructor: "呂欣澤", needsPower: true },
  { id: "142", name: "Julius Caesar", nameEn: "Julius Caesar", course: "數位人文與AI", courseEn: "Digital Humanities and AI", instructor: "呂欣澤", needsPower: true },
  { id: "143", name: "The Journey of Apollo", nameEn: "The Journey of Apollo", course: "數位人文與AI", courseEn: "Digital Humanities and AI", instructor: "呂欣澤", needsPower: true },
  { id: "144", name: "MBTeal: Discover Your Perfect Tea Identity", nameEn: "MBTeal: Discover Your Perfect Tea Identity", course: "日本九州大學 Robert T. Huang Entrepreneurship Center (QREC)", courseEn: "Robert T. Huang Entrepreneurship Center (QREC), Kyushu University", instructor: "Kosuke Kaneko", needsPower: true },
  { id: "145", name: "Your Magic Point", nameEn: "Your Magic Point", course: "日本九州大學 Robert T. Huang Entrepreneurship Center (QREC)", courseEn: "Robert T. Huang Entrepreneurship Center (QREC), Kyushu University", instructor: "Kosuke Kaneko", needsPower: true },
  { id: "146", name: "TOMOSHIBI", nameEn: "TOMOSHIBI", course: "日本九州大學 Robert T. Huang Entrepreneurship Center (QREC)", courseEn: "Robert T. Huang Entrepreneurship Center (QREC), Kyushu University", instructor: "Kosuke Kaneko", needsPower: true },
  { id: "147", name: "作品中文名稱：高碳排資產轉型潛力估值與交易平台", nameEn: "Brown-to-Green (B2G) Asset Transformer", course: "台北科技大學 資訊與財金管理系", courseEn: "Department of Information and Finance Management, National Taipei University of Technology", instructor: "鍾建屏", needsPower: true },
  { id: "148", name: "智慧保險理賠助手", nameEn: "Insurance Claim AI Assistant", course: "台北科技大學 資訊與財金管理系", courseEn: "Department of Information and Finance Management, National Taipei University of Technology", instructor: "鍾建屏", needsPower: true },
  { id: "149", name: "電腦繪圖生成藝術", nameEn: "Computer Graphic and AIGC Art", course: "電腦繪圖生成藝術", courseEn: "Computer Graphic and AIGC Art", instructor: "陳昭伶", needsPower: false },
];

// ==========================================
// 2. 展場網格參數
// ==========================================
const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M']; 
const ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const distributeProjects = (projects) => {
  const byCourse = {};
  projects.forEach(p => {
    if (!byCourse[p.course]) byCourse[p.course] = [];
    byCourse[p.course].push(p);
  });

  const courseKeys = Object.keys(byCourse).sort((a, b) => byCourse[b].length - byCourse[a].length);
  const distributed = [];
  let hasMore = true;
  
  while (hasMore) {
    hasMore = false;
    for (const course of courseKeys) {
      if (byCourse[course].length > 0) {
        distributed.push(byCourse[course].shift());
        hasMore = true;
      }
    }
  }
  return distributed;
};

// ==========================================
// 3. 主應用程式 Component
// ==========================================
export default function App() {
  const [projectsData, setProjectsData] = useState(initialProjectsData);
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  
  // ★ 管理員隱藏狀態 ★
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [updateMsg, setUpdateMsg] = useState('');
  
  const listRefs = useRef({});
  const fileInputRef = useRef(null);

  // ------------------------------------------
  // 動態分配展架邏輯
  // ------------------------------------------
  const { allBooths, finalProjectsData } = useMemo(() => {
    const booths = [];
    COLS.forEach(col => {
      ROWS.forEach(row => {
        if ((col === 'A' || col === 'M') && row === 11) return; 
        booths.push({
          id: `${col}${row}`,
          col: col,
          row: row,
          hasPower: ['A', 'B', 'C', 'D'].includes(col) || (col === 'E' && (row === 10 || row === 11)),
          projectId: null,
          isReserved: false
        });
      });
    });

    const assignableBooths = booths.filter(b => !b.isReserved);
    let powerBooths = assignableBooths.filter(b => b.hasPower);
    const regularBooths = assignableBooths.filter(b => !b.hasPower);

    const powerProjects = distributeProjects(projectsData.filter(p => p.needsPower));
    const regularProjects = distributeProjects(projectsData.filter(p => !p.needsPower));

    if (powerProjects.length > powerBooths.length) {
        const overflowCount = powerProjects.length - powerBooths.length;
        const overflowBooths = regularBooths.splice(0, overflowCount);
        overflowBooths.forEach(b => b.hasPower = true); 
        powerBooths = [...powerBooths, ...overflowBooths];
    }

    powerProjects.forEach((project, index) => {
      if (index < powerBooths.length) {
        powerBooths[index].projectId = project.id;
        project.assignedBooth = powerBooths[index].id;
      } else {
        project.assignedBooth = '未分配 (插座區已滿)';
      }
    });

    let remainingBooths = [
      ...powerBooths.filter(b => b.projectId === null),
      ...regularBooths
    ];

    regularProjects.forEach((project, index) => {
      if (index < remainingBooths.length) {
        remainingBooths[index].projectId = project.id;
        project.assignedBooth = remainingBooths[index].id;
      } else {
        project.assignedBooth = '未分配 (展場已滿)';
      }
    });

    return {
      allBooths: booths,
      finalProjectsData: projectsData.map(p => ({
        ...p,
        assignedBooth: powerProjects.find(x => x.id === p.id)?.assignedBooth || 
                       regularProjects.find(x => x.id === p.id)?.assignedBooth || '未分配'
      }))
    };
  }, [projectsData]);

  // ------------------------------------------
  // CSV 隱藏上傳功能
  // ------------------------------------------
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = [];
      let cur = '';
      let inQuote = false;
      let parsedData = [];

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === '"') {
          inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
          parsedData.push(cur);
          cur = '';
        } else if (char === '\n' && !inQuote) {
          parsedData.push(cur);
          rows.push(parsedData);
          parsedData = [];
          cur = '';
        } else {
          cur += char;
        }
      }
      if (cur) parsedData.push(cur);
      if (parsedData.length > 0) rows.push(parsedData);

      const headers = rows[0].map(h => h.replace(/\r?\n/g, ' ').trim());
      const idIdx = headers.findIndex(h => h.includes('組別編號'));
      const nameIdx = headers.findIndex(h => h.includes('專題名稱') && !h.includes('英'));
      const nameEnIdx = headers.findIndex(h => h.includes('專題名稱(英)') || h.includes('Project name'));
      const courseIdx = headers.findIndex(h => h.includes('所屬課程'));
      const instructorIdx = headers.findIndex(h => h.includes('課程教師'));
      const powerIdx = headers.findIndex(h => h.includes('插座'));

      if (idIdx === -1) {
        alert('CSV 格式錯誤，找不到「組別編號」欄位，無法進行更新比對！');
        return;
      }

      const newProjectsMap = {};
      let currentId = null;

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length < 2) continue;

        let rawId = row[idIdx]?.trim();
        if (rawId) currentId = rawId;

        if (currentId && !newProjectsMap[currentId]) {
           const updatePayload = {};

           if (nameIdx !== -1 && row[nameIdx]) updatePayload.name = row[nameIdx]?.trim();
           if (nameEnIdx !== -1 && row[nameEnIdx]) updatePayload.nameEn = row[nameEnIdx]?.trim();
           if (instructorIdx !== -1 && row[instructorIdx]) updatePayload.instructor = row[instructorIdx]?.trim();
           
           if (courseIdx !== -1 && row[courseIdx]) {
             const courseRaw = row[courseIdx]?.trim() || '';
             updatePayload.course = courseRaw.replace(/[a-zA-Z].*/, '').trim() || courseRaw;
             updatePayload.courseEn = courseRaw.match(/[a-zA-Z].*/) ? courseRaw.match(/[a-zA-Z].*/)[0] : '';
           }

           if (powerIdx !== -1 && row[powerIdx]) {
             const powerVal = row[powerIdx]?.trim();
             updatePayload.needsPower = ['○', 'O', 'o', 'v', 'V', 'yes', '是', 'Y'].some(char => powerVal.includes(char));
           }

           newProjectsMap[currentId] = updatePayload;
        }
      }

      let updatedCount = 0;
      let powerUpdated = powerIdx !== -1;
      
      setProjectsData(prev => prev.map(p => {
        const updated = newProjectsMap[p.id];
        if (updated) {
          updatedCount++;
          return {
            ...p,
            name: updated.name !== undefined ? updated.name : p.name,
            nameEn: updated.nameEn !== undefined ? updated.nameEn : p.nameEn,
            course: updated.course !== undefined ? updated.course : p.course,
            courseEn: updated.courseEn !== undefined ? updated.courseEn : p.courseEn,
            instructor: updated.instructor !== undefined ? updated.instructor : p.instructor,
            needsPower: updated.needsPower !== undefined ? updated.needsPower : p.needsPower
          };
        }
        return p;
      }));
      
      let msg = `✅ 成功讀取 ${updatedCount} 組資料！`;
      if (powerUpdated) msg += ` (插座與座位已重排)`;
      else msg += ` (文字資訊已更新)`;
      
      setUpdateMsg(msg);
      setTimeout(() => setUpdateMsg(''), 6000);
      if (fileInputRef.current) fileInputRef.current.value = ''; 
    };
    reader.readAsText(file);
  };

  const handleExportCSV = () => {
    const BOM = '\uFEFF';
    const headers = ['組別編號', '專題名稱(中文)', '展架編號', '所屬課程', '電力需求'];
    
    const rows = finalProjectsData.map(p => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      p.assignedBooth,
      `"${p.course}"`,
      p.needsPower ? '是 (Yes)' : '否 (No)'
    ]);
    
    const csvContent = BOM + [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '2026_INNOFEST_展架分配表.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const allCourses = useMemo(() => {
    const courseMap = new Map();
    finalProjectsData.forEach(p => {
      if (!courseMap.has(p.course)) {
        courseMap.set(p.course, p.courseEn);
      }
    });
    const courses = Array.from(courseMap.entries()).map(([course, courseEn]) => ({
      value: course,
      label: `${course} (${courseEn})`
    }));
    return [{ value: 'All', label: '全部課程 / All Courses' }, ...courses];
  }, [finalProjectsData]);

  const displayedProjects = useMemo(() => {
    return finalProjectsData.filter(project => {
      const matchSearch = 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (project.nameEn && project.nameEn.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.id.includes(searchTerm) ||
        (project.courseEn && project.courseEn.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.instructor.includes(searchTerm);
        
      const matchCourse = selectedCourse === 'All' || project.course === selectedCourse;
      return matchSearch && matchCourse;
    });
  }, [finalProjectsData, searchTerm, selectedCourse]);

  const handleItemClick = (groupId) => {
    if (activeGroupId === groupId) {
      setActiveGroupId(null);
    } else {
      setActiveGroupId(groupId);
      setTimeout(() => {
        if (listRefs.current[groupId]) {
          listRefs.current[groupId].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  useEffect(() => {
    setActiveGroupId(null);
  }, [selectedCourse, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 隱藏的 File Input */}
      <input 
        type="file" 
        accept=".csv" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        id="csvUpload"
      />

      {/* Header */}
      <header className={`text-white p-4 shadow-lg z-10 shrink-0 relative transition-colors duration-300 ${isAdminMode ? 'bg-indigo-900' : 'bg-sky-900'}`}>
        <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
          <div>
            {/* ★ 雙擊標題觸發隱藏管理員模式 ★ */}
            <h1 
              className="text-2xl font-bold tracking-wide cursor-default select-none flex items-center gap-2"
              onDoubleClick={() => setIsAdminMode(!isAdminMode)}
              title="雙擊此處可以開啟/關閉後台模式"
            >
              2026 NCCU INNOFEST 期末專題聯展 / Final Project Exhibition
              {isAdminMode && <Lock size={18} className="text-amber-400" />}
            </h1>
            <p className="text-sm text-sky-200 mt-1 flex items-center gap-2">
              Interactive Booth Map and Project Search System
              {updateMsg && <span className="bg-green-500 text-white px-3 py-0.5 rounded-full text-xs font-bold shadow-md animate-pulse">{updateMsg}</span>}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto items-center">
            
            {/* 只有在 isAdminMode 為 true 時才顯示管理按鈕 */}
            {isAdminMode && (
              <div className="flex gap-2 w-full md:w-auto animate-in fade-in slide-in-from-top-2 duration-300">
                <label 
                  htmlFor="csvUpload"
                  className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400 px-3 py-2 rounded-lg text-sm font-bold shadow-sm cursor-pointer transition-colors"
                >
                  <Upload size={16}/> 匯入更新 / Import
                </label>
                <button 
                  onClick={handleExportCSV}
                  className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-sky-950 px-3 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors"
                >
                  <Download size={16}/> 匯出分配表 / Export
                </button>
              </div>
            )}

            {/* 過濾與搜尋區 (一般使用者看得到的) */}
            <div className="flex w-full md:w-auto gap-2">
              <div className="relative flex-1 md:flex-none md:w-[250px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-4 w-4 text-sky-300" />
                </div>
                <select
                  className={`block w-full pl-9 pr-8 py-2 border text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs sm:text-sm appearance-none cursor-pointer transition truncate
                    ${isAdminMode ? 'border-indigo-700 bg-indigo-800 hover:bg-indigo-700' : 'border-sky-700 bg-sky-800 hover:bg-sky-700'}
                  `}
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  {allCourses.map(course => (
                    <option key={course.value} value={course.value}>
                      {course.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-sky-300" />
                </div>
              </div>
              
              <div className="relative flex-1 md:flex-none md:w-[200px]">
                <input
                  type="text"
                  placeholder="搜尋專題、課程或教師... / Search projects, courses, or teachers..."
                  className="w-full pl-9 pr-3 py-2 border border-transparent rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs sm:text-sm shadow-inner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

          </div>
        </div>
        
        {/* 管理員專屬提示橫幅 */}
        {isAdminMode && (
          <div className="absolute -bottom-8 left-0 right-0 bg-indigo-800 text-indigo-100 text-xs py-1.5 px-4 flex justify-center items-center gap-2 animate-in fade-in duration-300 shadow-md">
            <Lock size={12} className="text-amber-400"/>
            <span><strong>管理員模式已開啟 / Admin Mode On:</strong>您可以自由上傳 CSV 更新資料或匯出分配表 / Export。一般使用者看不到這些按鈕。（再次雙擊標題即可關閉）</span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className={`flex-1 max-w-[1700px] w-full mx-auto p-2 sm:p-3 lg:p-4 flex flex-col xl:flex-row gap-3 lg:gap-5 xl:gap-6 overflow-visible xl:overflow-hidden transition-all duration-300 ${isAdminMode ? 'mt-8 xl:h-[calc(100vh-120px)]' : 'xl:h-[calc(100vh-88px)]'}`}>
        
        {/* 左側：互動平面圖 */}
        <div className="xl:flex-[5] bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden relative min-h-[540px] md:min-h-[620px] xl:min-h-0">
          <div className="p-3 bg-slate-100 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 z-10 shrink-0">
            <h2 className="font-semibold text-slate-700 flex items-center text-sm sm:text-base">
              <MapIcon className="w-5 h-5 mr-2 text-sky-600" />
              展架平面圖 / Exhibition Booth Layout (12 Columns)
            </h2>
            <div className="flex gap-3 items-center flex-wrap">
              <div className="flex items-center gap-3 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm hidden sm:flex">
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-200 border border-amber-400 rounded-sm inline-block relative"><Zap size={10} className="absolute inset-0 m-auto text-amber-700"/></span> 插座展架 / Power Booth</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-sky-500 border border-sky-600 rounded-sm inline-block"></span> 一般展架 / Standard Booth</div>
              </div>
              {activeGroupId && (
                <button 
                  onClick={() => setActiveGroupId(null)}
                  className="text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded hover:bg-red-100 transition-colors"
                >
                  清除選取 / Clear Selection
                </button>
              )}
            </div>
          </div>
          
          <div className="flex-1 relative overflow-auto bg-[#f8fafc] p-2 sm:p-3 lg:p-5 custom-scrollbar flex justify-start xl:justify-center">
            <div className="relative min-w-[760px] sm:min-w-[860px] lg:min-w-[950px] max-w-[1300px] w-full bg-white rounded shadow-sm border border-gray-300 p-4 sm:p-5 lg:p-6 pb-28 flex flex-col">
              
              {/* --- 頂部環境 --- */}
              <div className="w-full flex justify-between items-start mb-10 lg:mb-12 relative px-2 sm:px-4">
                <div className="mt-8 w-28 h-16 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-gray-500 shadow-inner text-center leading-tight px-1">
                  <MonitorPlay className="w-5 h-5 mb-1"/>
                  <span className="font-bold text-xs tracking-wider leading-tight text-center"><span className="block">投影區</span><span className="block text-[10px] font-semibold tracking-normal">Projection Area</span></span>
                </div>

                <div className="flex-[2] mx-4 sm:mx-6 lg:mx-10 h-20 bg-[#1e3a8a] flex flex-col items-center justify-center rounded-b shadow-md border-b-4 border-[#172554] relative z-20 text-center px-3">
                  <span className="font-bold text-white tracking-wide lg:tracking-widest text-base lg:text-lg leading-tight text-center">四維堂舞台 (Siwei Hall Stage)</span>
                  <div className="absolute -bottom-3 flex justify-center w-full">
                    <span className="bg-white text-gray-700 text-[10px] font-bold px-6 py-1 border border-gray-200 rounded shadow-sm">貴賓席 / VIP Seating</span>
                  </div>
                </div>

                <div className="mt-8 w-32 h-20 bg-orange-50/50 border-2 border-dashed border-orange-200 rounded-xl flex flex-col items-center justify-center p-2 shadow-sm relative right-2 text-center leading-tight">
                  <span className="font-bold text-orange-700/80 text-xs mb-2 tracking-wider leading-tight text-center"><span className="block">休息區</span><span className="block text-[10px] tracking-normal">Rest Area</span></span>
                </div>
              </div>

              {/* --- 核心網格區 --- */}
              <div 
                className="grid w-full flex-1 gap-1.5 lg:gap-2 relative z-10 my-4 px-2 sm:px-4"
                style={{ 
                  gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                  gridTemplateRows: 'repeat(11, minmax(0, 1fr))'
                }}
              >
                {ROWS.map(row => (
                  <React.Fragment key={`row-${row}`}>
                    {COLS.map(col => {
                      if ((col === 'A' || col === 'M') && row === 11) {
                        return <div key={`empty-${col}${row}`} />;
                      }

                      const booth = allBooths.find(b => b.col === col && b.row === row);
                      if (!booth) return <div key={`missing-${col}${row}`} />;
                      
                      if (booth.isReserved) {
                        return (
                          <div
                            key={booth.id}
                            className="relative flex flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 bg-gray-50/50 min-h-[38px] opacity-70"
                            title={`預留空間
Reserved ${booth.id}`}
                          >
                             <span className="text-[10px] font-bold text-gray-400">{booth.id}</span>
                             <span className="text-[9px] text-gray-400 mt-0.5 tracking-wider">預留空間
Reserved</span>
                          </div>
                        )
                      }

                      const project = finalProjectsData.find(p => p.id === booth.projectId);
                      const isActive = project && activeGroupId === project.id;
                      const isVisible = project && displayedProjects.some(p => p.id === project.id);
                      const isEmpty = !project;

                      return (
                        <div
                          key={booth.id}
                          onClick={() => (isVisible && !isEmpty) && handleItemClick(project.id)}
                          className={`
                            relative flex flex-col items-center justify-center rounded transition-all duration-300 border-b-4
                            min-h-[38px]
                            ${booth.hasPower ? 'bg-amber-100/90 border-amber-300' : 'bg-sky-500 border-sky-700'}
                            ${isEmpty ? 'opacity-20' : 'cursor-pointer shadow hover:-translate-y-1 hover:shadow-lg'}
                            ${!isVisible && !isEmpty ? 'opacity-20 grayscale' : ''}
                            ${isActive ? 'bg-amber-400 border-amber-600 shadow-[0_0_25px_rgba(251,191,36,0.9)] z-30 scale-125 ring-2 ring-white ring-offset-1' : 'z-10'}
                          `}
                          title={isEmpty ? `${booth.id} (Available)` : `${project.name} (${project.course}) - Booth ${booth.id}`}
                        >
                          {booth.hasPower && (
                            <div className="absolute -left-1.5 -top-1.5 text-amber-600 bg-white rounded-full p-0.5 shadow-sm">
                              <Zap size={10} fill="currentColor" />
                            </div>
                          )}
                          
                          <span className={`text-[9px] sm:text-[10px] font-bold ${isActive ? 'text-amber-950' : (booth.hasPower ? 'text-amber-900' : 'text-white')}`}>
                            {booth.id}
                          </span>
                          {project && isActive && (
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] font-bold px-2 py-0.5 rounded whitespace-nowrap shadow-lg z-50">
                              組別 / Group {project.id}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>

              {/* --- 底部環境 --- */}
              <div className="w-full flex justify-between items-start relative px-2 sm:px-4 mt-6 pb-4">
                
                <div className="w-32 h-20 bg-green-50 border-2 border-dashed border-green-300 rounded-lg flex flex-col items-center justify-center text-green-700 shadow-sm relative z-10 -ml-2 text-center leading-tight px-1">
                  <Utensils className="w-6 h-6 mb-1 text-green-500"/>
                  <span className="font-bold text-sm tracking-wide leading-tight text-center"><span className="block">領餐區</span><span className="block text-[10px] font-semibold tracking-normal">Meal Pickup Area</span></span>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 flex items-start gap-2 lg:gap-3 z-20">
                  <div className="w-24 h-16 bg-gray-100 border-2 border-gray-300 rounded-tl-lg flex flex-col items-center justify-center text-gray-600 font-bold shadow-sm mt-6 text-center leading-tight px-1">
                    <Megaphone className="w-4 h-4 mb-1 text-gray-400"/>
                    <span className="text-xs leading-tight text-center"><span className="block">服務台</span><span className="block text-[9px] font-semibold">Information Desk</span></span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-44 lg:w-48 h-24 border-4 border-orange-400 bg-white shadow-xl flex flex-col items-center justify-center rounded-lg relative top-4 text-center leading-tight px-2">
                      <span className="font-bold text-orange-600 text-lg lg:text-xl text-center">報到區</span>
                      <span className="text-xs text-orange-400 font-bold mt-1">(Registration Area)</span>
                    </div>
                    <span className="text-[11px] lg:text-xs text-gray-500 font-bold mt-6 tracking-wide bg-gray-100 px-3 lg:px-4 py-1 rounded-full border border-gray-200 shadow-sm text-center whitespace-nowrap">
                      四維堂入口 / Siwei Hall Entrance
                    </span>
                  </div>

                  <div className="w-24 h-16 bg-gray-100 border-2 border-gray-300 rounded-tr-lg flex flex-col items-center justify-center text-gray-600 font-bold shadow-sm mt-6 text-center leading-tight px-1">
                    <Megaphone className="w-4 h-4 mb-1 text-gray-400"/>
                    <span className="text-xs leading-tight text-center"><span className="block">服務台</span><span className="block text-[9px] font-semibold">Information Desk</span></span>
                  </div>
                </div>

                <div className="w-36 h-24 bg-orange-50/40 border-2 border-dashed border-orange-200 rounded-xl flex flex-col items-center justify-center p-2 shadow-sm relative z-10 -mr-2 text-center leading-tight">
                  <span className="font-bold text-orange-700/80 text-xs mb-2 tracking-wider leading-tight text-center"><span className="block">休息區</span><span className="block text-[10px] tracking-normal">Rest Area</span></span>
                  <div className="flex justify-center gap-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 bg-orange-100 border-2 border-orange-300 rounded-full flex items-center justify-center shadow-sm">
                        <Coffee className="w-3 h-3 text-orange-600/70" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* 右側：專題清單 / Project List */}
        <div className="xl:flex-[2] bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col max-h-[72vh] md:max-h-[78vh] xl:h-full xl:max-h-none overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-gray-200 bg-slate-100 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 shrink-0">
            <h2 className="font-semibold text-slate-700 flex items-center">
              <List className="w-5 h-5 mr-2 text-sky-600" />
              專題清單 / Project List ({displayedProjects.length})
            </h2>
            <span className="text-xs text-gray-500 hidden sm:inline">點擊展開詳細資訊 / Click to expand</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 bg-slate-50 space-y-2 relative scroll-smooth custom-scrollbar">
            {displayedProjects.length === 0 ? (
              <div className="text-center text-gray-500 py-20 flex flex-col items-center">
                <Search className="w-12 h-12 text-gray-300 mb-4" />
                <p>找不到符合條件的專題 / No matching projects found</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCourse('All'); }}
                  className="mt-4 text-sky-600 underline text-sm hover:text-sky-800"
                >
                  清除過濾條件 / Clear Filters
                </button>
              </div>
            ) : (
              displayedProjects.map((project) => {
                const isExpanded = activeGroupId === project.id;
                const isUnassigned = project.assignedBooth.includes('未分配');
                
                return (
                  <div
                    key={project.id}
                    ref={el => listRefs.current[project.id] = el}
                    className={`rounded-lg transition-all duration-300 border 
                      ${isExpanded 
                        ? 'bg-white border-amber-400 shadow-md ring-1 ring-amber-400' 
                        : 'bg-white border-gray-200 hover:border-sky-300 hover:shadow-sm'
                      }
                      ${isUnassigned ? 'opacity-70' : ''}
                    `}
                  >
                    <div 
                      onClick={() => handleItemClick(project.id)}
                      className={`p-3 sm:p-4 cursor-pointer flex justify-between items-center
                        ${isExpanded ? 'bg-amber-50/50 rounded-t-lg' : 'rounded-lg'}
                      `}
                    >
                      <div className="flex-1 pr-2 sm:pr-4 overflow-hidden min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold shrink-0
                            ${isExpanded ? 'bg-amber-200 text-amber-800' : 'bg-sky-100 text-sky-800'}
                          `}>
                            組 / Group {project.id}
                          </span>
                          <span className="text-[10px] text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full truncate max-w-[150px] sm:max-w-[220px] lg:max-w-[260px]" title={project.courseEn}>
                            {project.course}
                          </span>
                          {project.needsPower && (
                            <span className="text-[10px] text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
                              <Zap size={10} fill="currentColor" /> 插座 / Power
                            </span>
                          )}
                          {isUnassigned && (
                             <span className="text-[10px] text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
                              <AlertCircle size={10} fill="currentColor" /> 需處理 / Action Needed
                            </span>
                          )}
                        </div>
                        <h3 className={`font-bold text-sm sm:text-base leading-snug line-clamp-2
                          ${isExpanded ? 'text-sky-900' : 'text-gray-800'}
                        `}>
                          {project.name}
                        </h3>
                        {!isExpanded && project.nameEn && project.nameEn !== project.name && (
                           <p className="text-[11px] text-gray-500 truncate mt-0.5">{project.nameEn}</p>
                        )}
                      </div>
                      
                      <div className="shrink-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-50 text-gray-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 border-t border-amber-100 bg-white rounded-b-lg text-sm animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4">
                          <div className="sm:col-span-2">
                            <span className="text-gray-400 block text-[11px] font-semibold tracking-wider mb-1">完整專題名稱 / PROJECT NAME</span>
                            <span className="font-bold text-gray-900 text-base block leading-snug break-words">{project.name}</span>
                            {project.nameEn && project.nameEn !== project.name && (
                               <span className="text-gray-600 text-sm block mt-1 leading-snug break-words">{project.nameEn}</span>
                            )}
                          </div>
                          
                          <div className="sm:col-span-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <span className="text-gray-400 block text-[11px] font-semibold tracking-wider mb-1">所屬課程 / COURSE</span>
                            <span className="text-gray-800 font-medium block leading-snug break-words">{project.course}</span>
                            {project.courseEn && (
                               <span className="text-gray-500 text-xs block mt-0.5 leading-snug break-words">{project.courseEn}</span>
                            )}
                          </div>
                          
                          <div>
                            <span className="text-gray-400 block text-[11px] font-semibold tracking-wider mb-1">指導教師 / TEACHER</span>
                            <span className="text-gray-800 font-medium">{project.instructor || '未提供 / N/A'}</span>
                          </div>

                          <div className="sm:col-span-2 mt-1 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <div className={`flex items-center font-bold px-3 py-2 rounded-lg border
                              ${isUnassigned ? 'bg-red-50 text-red-700 border-red-200' : (project.hasPower ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-sky-50 text-sky-700 border-sky-200')}
                            `}>
                              <MapPin className="w-4 h-4 mr-1.5" />
                              展架編號 / Booth: {project.assignedBooth}
                            </div>
                            {!isUnassigned && (
                              <span className="text-xs font-bold text-amber-600 animate-pulse bg-amber-100 px-2 py-1 rounded hidden sm:inline">
                                地圖已標示 / Highlighted on Map
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
        @media (max-width: 767px) {
          body { overflow-x: hidden; }
          select, input { font-size: 16px; }
        }
        @media (min-width: 1280px) and (max-width: 1440px) {
          .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        }
      `}} />
    </div>
  );
}