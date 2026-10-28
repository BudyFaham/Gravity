import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpLeft,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  LayoutGrid,
  List,
  X,
  FlaskConical,
  GraduationCap,
  Headphones,
  Play,
  Search,
  Sparkles,
  Youtube,
} from "lucide-react";
import { metadata } from "@/data/videos";
import type { CustomVideo } from "@/lib/customVideos";

declare global {
  interface Window {
    YT?: any;
  }
}

type Video = {
  number: number;
  sortOrder: number;
  lectureNumber?: number;
  id: string;
  title: string;
  category: "شرح" | "حل" | "حل إمتحان جزئي" | "حل إمتحان شامل" | "أساسيات";
  lesson: string;
  section: "الشرح" | "الاختبارات الجزئية" | "الامتحانات الشاملة" | "الحل";
  solutionGroup?: "حل المذكرة" | "حل كتاب الامتحان" | "حل الامتحانات الجزئية" | "حل الامتحانات الشاملة";
  publishedAt?: string;
  duration?: string;
  homework?: string[];
  description?: string;
};

const videos: Video[] = [
  { number: 1, sortOrder: 4, id: "CFTqUwllwdU", title: "محاضرة ٠ - أساسيات ما قبل الفيزياء", category: "أساسيات", lesson: "تمهيد", section: "الشرح" },
  { number: 2, sortOrder: 0, id: "i45XNUbKUhI", title: "محاضرة ١ - شرح فصل ١ درس ١ - التيار الكهربي", category: "شرح", lesson: "الفصل الأول", section: "الشرح" },
  { number: 3, sortOrder: 1, id: "13IfG3sb4hs", title: "محاضرة ٢ - شرح فصل ١ درس ١ - فرق الجهد والمقاومة", category: "شرح", lesson: "الفصل الأول", section: "الشرح" },
  { number: 4, sortOrder: 2, id: "HDw8tCZJFGo", title: "محاضرة ٣ - حل فصل ١ درس ١", category: "حل", lesson: "الفصل الأول", section: "الحل", solutionGroup: "حل المذكرة" },
  { number: 5, sortOrder: 3, id: "aFKkxlpI5CE", title: "محاضرة ٤ - شرح فصل ١ درس ١", category: "شرح", lesson: "الفصل الأول", section: "الشرح" },
  { number: 6, sortOrder: 5, id: "XLKtw954Jvs", title: "محاضرة ٥ - شرح فصل ١ درس ٢", category: "شرح", lesson: "الفصل الأول", section: "الشرح" },
  { number: 7, sortOrder: 6, id: "qGc1dpan0AY", title: "محاضرة ٦ - حل فصل ١ درس ١ - اختر", category: "حل", lesson: "الفصل الأول", section: "الحل", solutionGroup: "حل المذكرة" },
  { number: 8, sortOrder: 7, id: "VHd5f4Vxdo0", title: "محاضرة ٧ - حل فصل ١ درس ١ - المقالي", category: "حل", lesson: "الفصل الأول", section: "الحل", solutionGroup: "حل المذكرة" },
  { number: 9, sortOrder: 8, id: "51jPPukv_Sc", title: "محاضرة ٨ - شرح فصل ١ درس ٢", category: "شرح", lesson: "الفصل الأول", section: "الشرح" },
  { number: 10, sortOrder: 11, id: "e_bA-FH7Xdk", title: "محاضرة ٩ - شرح فصل ١ درس ٢", category: "شرح", lesson: "الفصل الأول", section: "الشرح" },
  { number: 11, sortOrder: 13, id: "WiAU-Z55jCw", title: "محاضرة ١٠ - حل فصل ١ درس ٢", category: "حل", lesson: "الفصل الأول", section: "الحل", solutionGroup: "حل المذكرة" },
  { number: 12, sortOrder: 14, id: "CfUeMuymrZE", title: "محاضرة ١١ - شرح فصل ١ درس ٢", category: "شرح", lesson: "الفصل الأول", section: "الشرح" },
  { number: 13, sortOrder: 15, id: "kHvHxaXMY3M", title: "محاضرة ١٢ - شرح فصل ١ درس ٢", category: "شرح", lesson: "الفصل الأول", section: "الشرح" },
  { number: 14, sortOrder: 16, id: "lcHezHQkabY", title: "محاضرة ١٣ - حل فصل ١ درس ٢", category: "حل", lesson: "الفصل الأول", section: "الحل", solutionGroup: "حل المذكرة" },
  { number: 15, sortOrder: 19, id: "AjfkuDxAtHg", title: "محاضرة ١٤ - شرح فصل ١ درس ٢", category: "شرح", lesson: "الفصل الأول", section: "الشرح" },
  { number: 16, sortOrder: 21, id: "9IznvBdtXBM", title: "محاضرة ١٦ - شرح فصل ١ درس ٢", category: "حل", lesson: "الفصل الأول", section: "الحل", solutionGroup: "حل المذكرة" },
  { number: 17, sortOrder: 22, id: "n9bU4aW33y0", title: "محاضرة ١٧ - حل فصل ١ درس ٢", category: "حل", lesson: "الفصل الأول", section: "الحل", solutionGroup: "حل المذكرة" },
  { number: 18, sortOrder: 20, id: "T4HMAIXo3Qo", title: "محاضرة ١٥ - حل فصل ١ درس ٢", category: "حل", lesson: "الفصل الأول", section: "الحل", solutionGroup: "حل المذكرة" },
  { number: 19, sortOrder: 24, id: "iir90co7DKU", title: "محاضرة ١٨ - شرح فصل ١ درس ٣", category: "شرح", lesson: "الفصل الأول", section: "الشرح" },
  { number: 37, sortOrder: 46, lectureNumber: 31, id: "Yn9JKOLD-LA", title: "محاضرة ٣١ - شرح فصل ٢ درس ١", category: "شرح", lesson: "الفصل الثاني - الدرس الأول", section: "الشرح" },
  { number: 38, sortOrder: 29, lectureNumber: 20, id: "VwYDbduZ7V4", title: "محاضرة ٢٠ - حل فصل ١ درس ٣ - الجزء الأول", category: "حل", lesson: "الفصل الأول - الدرس الثالث", section: "الحل", solutionGroup: "حل المذكرة" },
  { number: 39, sortOrder: 30, lectureNumber: 20, id: "CP5A1kr2s-0", title: "محاضرة ٢٠ - حل فصل ١ درس ٣ - الجزء الثاني", category: "حل", lesson: "الفصل الأول - الدرس الثالث", section: "الحل", solutionGroup: "حل المذكرة" },
  { number: 40, sortOrder: 32, lectureNumber: 21, id: "g7rgiQ0wycY", title: "محاضرة ٢١ - فصل ١ درس ٢ و٣ - تدريب هام", category: "شرح", lesson: "الفصل الأول - الدرس الثاني والثالث", section: "الشرح" },
  { number: 41, sortOrder: 33, lectureNumber: 22, id: "FK--8Rjd7dk", title: "محاضرة ٢٢ - شرح فصل ١ درس ٢ و٣ - أفكار شدة الاضاءة و القدرة الكهربية", category: "شرح", lesson: "الفصل الأول - الدرس الثاني والثالث", section: "الشرح" },
  { number: 42, sortOrder: 34, lectureNumber: 23, id: "s9F036Igt5M", title: "محاضرة ٢٣ - حل فصل ١ درس ٣", category: "حل", lesson: "الفصل الأول - الدرس الثالث", section: "الحل", solutionGroup: "حل المذكرة" },
  { number: 43, sortOrder: 35, lectureNumber: 24, id: "X-8CqCy5r4Y", title: "محاضرة ٢٤ - شرح فصل ١ درس ٤ - قوانين كيرشوف", category: "شرح", lesson: "الفصل الأول - الدرس الرابع", section: "الشرح" },
  { number: 44, sortOrder: 36, lectureNumber: 25, id: "RkGbgGV5BMA", title: "محاضرة ٢٥ - شرح فصل ١ درس ٤ - تابع أفكار قوانين كيرشوف", category: "شرح", lesson: "الفصل الأول - الدرس الرابع", section: "الشرح" },
  { number: 45, sortOrder: 38, lectureNumber: 26, id: "jT93ygktVic", title: "محاضرة ٢٦ - حل فصل ١ درس ٤", category: "حل", lesson: "الفصل الأول - الدرس الرابع", section: "الحل", solutionGroup: "حل المذكرة" },
  { number: 46, sortOrder: 39, lectureNumber: 27, id: "-x05tBqFP-8", title: "محاضرة ٢٧ - تابع حل فصل ١ درس ٤", category: "حل", lesson: "الفصل الأول - الدرس الرابع", section: "الحل", solutionGroup: "حل المذكرة" },
  { number: 47, sortOrder: 40, lectureNumber: 28, id: "FeAbWLzogoo", title: "محاضرة ٢٨ - تركات هامة على الفصل الأول", category: "شرح", lesson: "الفصل الأول", section: "الشرح" },
  { number: 48, sortOrder: 41, lectureNumber: 29, id: "6eXhEKR4_-s", title: "محاضرة ٢٩ - مراجعة على قوانين وملاحظات الفصل الاول", category: "شرح", lesson: "الفصل الأول", section: "الشرح" },
  { number: 49, sortOrder: 42, lectureNumber: 30, id: "ve_JawoqRD4", title: "محاضرة ٣٠ - شرح فصل ٢ درس ١", category: "شرح", lesson: "الفصل الثاني - الدرس الأول", section: "الشرح" },
  { number: 20, sortOrder: 9, id: "nglsS4x01No", title: "حل اختبار جزئي ١", category: "حل", lesson: "حل إمتحان جزئي", section: "الحل", solutionGroup: "حل الامتحانات الجزئية" },
  { number: 21, sortOrder: 12, id: "twGf7a4YDxE", title: "حل اختبار جزئي ٢", category: "حل", lesson: "حل إمتحان جزئي", section: "الحل", solutionGroup: "حل الامتحانات الجزئية" },
  { number: 22, sortOrder: 18, id: "Ogsv63dNJag", title: "حل اختبار جزئي ٣", category: "حل", lesson: "حل إمتحان جزئي", section: "الحل", solutionGroup: "حل الامتحانات الجزئية" },
  { number: 23, sortOrder: 25, id: "j61lK_6vG6c", title: "حل اختبار جزئي ٤", category: "حل", lesson: "حل إمتحان جزئي", section: "الحل", solutionGroup: "حل الامتحانات الجزئية" },
  { number: 24, sortOrder: 26, id: "Evfj2523Mx8", title: "حل اختبار جزئي ٥", category: "حل", lesson: "حل إمتحان جزئي", section: "الحل", solutionGroup: "حل الامتحانات الجزئية" },
  { number: 25, sortOrder: 10, id: "8w4URdaLBoE", title: "حل امتحان شامل ١", category: "حل", lesson: "حل إمتحان شامل", section: "الحل", solutionGroup: "حل الامتحانات الشاملة" },
  { number: 26, sortOrder: 17, id: "2ERsax0wGzw", title: "حل امتحان شامل ٢", category: "حل", lesson: "حل إمتحان شامل", section: "الحل", solutionGroup: "حل الامتحانات الشاملة" },
  { number: 27, sortOrder: 23, id: "VX2G-TQyFCU", title: "حل امتحان شامل ٣", category: "حل", lesson: "حل إمتحان شامل", section: "الحل", solutionGroup: "حل الامتحانات الشاملة" },
  { number: 28, sortOrder: 47, id: "gHQ6JVR7F2k", publishedAt: "2026-08-13T11:28:51-07:00", title: "محاضرة ١ — حل كتاب الامتحان — الدرس ١، أسئلة ١–١٢", category: "حل", lesson: "الفصل الأول - الدرس الأول", section: "الحل", solutionGroup: "حل كتاب الامتحان" },
  { number: 29, sortOrder: 48, id: "_9dS1aKNS0A", publishedAt: "2026-08-14T00:06:17-07:00", title: "حل كتاب الامتحان — الدرس ١، أسئلة ١٣–٣٤", category: "حل", lesson: "الفصل الأول - الدرس الأول", section: "الحل", solutionGroup: "حل كتاب الامتحان" },
  { number: 30, sortOrder: 49, id: "tUTp3iy-Yqg", publishedAt: "2026-08-20T10:04:22-07:00", title: "محاضرة ٢ — حل كتاب الامتحان — الدرس ١، أسئلة ٣١–٦٠", category: "حل", lesson: "الفصل الأول - الدرس الأول", section: "الحل", solutionGroup: "حل كتاب الامتحان" },
  { number: 31, sortOrder: 50, id: "56-NElO_N6k", publishedAt: "2026-08-22T10:00:29-07:00", title: "حل كتاب الامتحان — الدرس ١، أسئلة ٦١–٩٤", category: "حل", lesson: "الفصل الأول - الدرس الأول", section: "الحل", solutionGroup: "حل كتاب الامتحان" },
  { number: 32, sortOrder: 51, id: "fhFs_sFP6OE", publishedAt: "2026-08-25T10:00:04-07:00", title: "محاضرة ٤ — حل كتاب الامتحان — أسئلة مقالية الدرس ١", category: "حل", lesson: "الفصل الأول - الدرس الأول", section: "الحل", solutionGroup: "حل كتاب الامتحان" },
  { number: 33, sortOrder: 52, id: "zrOnM1Wa3cw", publishedAt: "2026-08-28T00:16:40-07:00", title: "حل أسئلة امتحانات سابقة — الدرس الأول", category: "حل", lesson: "الفصل الأول - الدرس الأول", section: "الحل", solutionGroup: "حل كتاب الامتحان" },
  { number: 34, sortOrder: 53, id: "5w4X83rgKOM", publishedAt: "2026-09-14T05:23:52-07:00", title: "محاضرة ٥ — حل كتاب الامتحان — الدرس ٢، أسئلة ١–٤٠", category: "حل", lesson: "الفصل الأول - الدرس الثاني", section: "الحل", solutionGroup: "حل كتاب الامتحان" },
  { number: 55, sortOrder: 47, lectureNumber: 32, id: "_qogEB8krq0", title: "محاضرة ٣٢ - حل فصل ٢ درس ١", category: "حل", lesson: "الفصل الثاني - الدرس الأول", section: "الحل", solutionGroup: "حل المذكرة" },
  { number: 56, sortOrder: 48, lectureNumber: 33, id: "3FgxWJtmY6E", title: "محاضرة ٣٣ - شرح فصل ٢ درس ١", category: "شرح", lesson: "الفصل الثاني - الدرس الأول", section: "الشرح" },
  { number: 57, sortOrder: 49, lectureNumber: 34, id: "SaR5iliVSCE", title: "محاضرة ٣٤ - تابع حل فصل ٢ درس ١", category: "حل", lesson: "الفصل الثاني - الدرس الأول", section: "الحل", solutionGroup: "حل المذكرة" },
  { number: 58, sortOrder: 50, lectureNumber: 35, id: "TLHeyfvy4Bw", title: "محاضرة ٣٥ - شرح فصل ٢ درس ٢", category: "شرح", lesson: "الفصل الثاني - الدرس الثاني", section: "الشرح" },
  { number: 35, sortOrder: 27, id: "CnISfx_P14M", title: "محاضرة ١٩ - شرح فصل ١ درس ٣ - الجزء الأول", category: "شرح", lesson: "محاضرة 19", section: "الشرح" },
  { number: 36, sortOrder: 28, id: "ekaTYuOkjLk", title: "محاضرة ١٩ - شرح فصل ١ درس ٣ - الجزء الثاني", category: "شرح", lesson: "محاضرة 19", section: "الشرح" },
  { number: 50, sortOrder: 31, id: "84TgA62b80A", title: "حل اختبار جزئي ٦", category: "حل", lesson: "الاختبارات الجزئية", section: "الحل", solutionGroup: "حل الامتحانات الجزئية" },
  { number: 51, sortOrder: 37, id: "dg_h93DBBiA", title: "حل اختبار جزئي ٧", category: "حل", lesson: "الاختبارات الجزئية", section: "الحل", solutionGroup: "حل الامتحانات الجزئية" },
  { number: 52, sortOrder: 45, id: "Su9uCgYUyI0", title: "حل اختبار جزئي ٨", category: "حل", lesson: "الاختبارات الجزئية", section: "الحل", solutionGroup: "حل الامتحانات الجزئية" },
  { number: 53, sortOrder: 43, id: "qvaSC9a-m2c", title: "حل امتحان شامل ٤", category: "حل", lesson: "الامتحانات الشاملة", section: "الحل", solutionGroup: "حل الامتحانات الشاملة" },
  { number: 54, sortOrder: 44, id: "1b18JrUCBrE", title: "حل امتحان شامل ٥", category: "حل", lesson: "الامتحانات الشاملة", section: "الحل", solutionGroup: "حل الامتحانات الشاملة" },
];


const durations: Record<string, string> = {
  "CFTqUwllwdU": "56:51",
  "i45XNUbKUhI": "1:18:52",
  "13IfG3sb4hs": "1:34:42",
  "HDw8tCZJFGo": "1:27:05",
  "aFKkxlpI5CE": "1:03:38",
  "XLKtw954Jvs": "1:12:22",
  "qGc1dpan0AY": "1:36:18",
  "VHd5f4Vxdo0": "1:31:52",
  "51jPPukv_Sc": "57:33",
  "e_bA-FH7Xdk": "52:40",
  "WiAU-Z55jCw": "30:32",
  "CfUeMuymrZE": "1:08:41",
  "kHvHxaXMY3M": "23:59",
  "lcHezHQkabY": "57:29",
  "AjfkuDxAtHg": "34:44",
  "9IznvBdtXBM": "56:28",
  "n9bU4aW33y0": "57:54",
  "T4HMAIXo3Qo": "1:44:39",
  "iir90co7DKU": "57:33",
  "nglsS4x01No": "3:03",
  "twGf7a4YDxE": "11:02",
  "Ogsv63dNJag": "7:55",
  "j61lK_6vG6c": "3:26",
  "Evfj2523Mx8": "5:52",
  "gHQ6JVR7F2k": "34:03",
  "_9dS1aKNS0A": "38:46",
  "tUTp3iy-Yqg": "44:06",
  "56-NElO_N6k": "1:11:36",
  "fhFs_sFP6OE": "36:47",
  "zrOnM1Wa3cw": "1:00:29",
  "5w4X83rgKOM": "2:13:22",
  "_qogEB8krq0": "50:57",
  "3FgxWJtmY6E": "48:51",
  "SaR5iliVSCE": "1:14:11",
  "TLHeyfvy4Bw": "55:51",
  "CnISfx_P14M": "38:53",
  "ekaTYuOkjLk": "1:01:55",
  "8w4URdaLBoE": "32:45",
  "2ERsax0wGzw": "51:10",
  "VX2G-TQyFCU": "51:49",
  "Yn9JKOLD-LA": "48:47",
  "VwYDbduZ7V4": "11:05",
  "CP5A1kr2s-0": "1:02:25",
  "g7rgiQ0wycY": "1:17:12",
  "FK--8Rjd7dk": "1:04:49",
  "s9F036Igt5M": "1:28:29",
  "X-8CqCy5r4Y": "50:19",
  "RkGbgGV5BMA": "55:56",
  "jT93ygktVic": "1:35:15",
  "-x05tBqFP-8": "49:05",
  "FeAbWLzogoo": "42:36",
  "6eXhEKR4_-s": "58:51",
  "ve_JawoqRD4": "1:02:04",
  "84TgA62b80A": "12:10",
  "dg_h93DBBiA": "10:27",
  "Su9uCgYUyI0": "9:18",
  "qvaSC9a-m2c": "1:03:20",
  "1b18JrUCBrE": "55:07",
};
const sections = ["الكل", "الشرح", "الحل", "حل الاختبارات الجزئية", "حل الاختبارات الشاملة", "حل كتاب الامتحان"] as const;

const homeworkByLesson: Record<string, string> = {
  "محاضرة 1": "المذكرة: ص64، ص65 ماعدا 17 و18، وص79 المسائل من 1 إلى 4.",
  "محاضرة 2": "المذكرة: ص66 من 21 إلى 24، ص67، ص68 ماعدا 37، ص72–73، ص80. كتاب الامتحان ص9–15 بعد سماع فيديو الحل يوم الخميس الساعة 4.",
  "محاضرة 4": "المذكرة من ص74 إلى 79، ص81–82، ص83 رقما 37 و38، ومن ص84 إلى 86. كتاب الامتحان من ص16 إلى 20.",
  "محاضرة 5": "المذكرة ص90 كلها، رقم 7 تعديل د من 750 إلى 0.75، وص91 رقما 8 و9. كتاب الامتحان ص21–29 بعد فيديو حل المذكرة.",
  "محاضرة 8": "المذكرة ص94. كتاب الامتحان ص30–35، ص38، وص39 أرقام 1 و2 و3.",
  "محاضرة 9": "المذكرة ص95، وص96 ماعدا 27–30. كتاب الامتحان باقي ص39 وص40 ماعدا 10.",
  "محاضرة 11": "المذكرة باقي ص96 وباقي ص32. كتاب الامتحان ص43، وص44 أرقام 9 و10 و11 و12.",
  "محاضرة 12": "المذكرة ص35–36، ص91 رقما 10 و11، ص92 كلها مع تعديل رقم 12، وباقي ص97 وص98. كتاب الامتحان ص40 رقم 10، وص41–42 و44–45.",
  "محاضرة 14": "المذكرة من ص99 إلى 102. كتاب الامتحان من ص46 إلى 54.",
  "محاضرة 16": "المذكرة ص93، ومن ص103 إلى 105. كتاب الامتحان من ص55 إلى 61.",
  "محاضرة 18": "المذكرة ص109 أرقام 1–4، وص111 أرقام 18–20. كتاب الامتحان من ص86 إلى 88.",
};

const homeworkByVideo: Record<string, string[]> = {
  "i45XNUbKUhI": ["المذكرة", "ص٦٤", "ص٦٥ ماعدا ١٧ و ١٨", "ص٧٩ المسائل من ١ ل ٤"],
  "13IfG3sb4hs": ["المذكرة ص٦٦ من ٢١ ل ٢٤", "ص٦٧", "ص٦٨ ماعدا ٣٧", "ص٧٢و٧٣", "ص٨٠", "كتاب الامتحان من ص٩ ل ص١٥", "هتحله بعد سماع فيديو حل يوم الخميس الساعة ٤"],
  "aFKkxlpI5CE": ["المذكرة من ص٧٤ ل ٧٩", "ص٨١ و ٨٢", "ص٨٣ رقم ٣٧ و ٣٨", "من ص٨٤ ل ٨٦", "كتاب الامتحان", "من ص١٦ ل ٢٠"],
  "XLKtw954Jvs": ["المذكرة ص٩٠ كلها", "رقم ٧ هتعدل د من 750 ل 0.75", "ص٩١ رقم ٨و٩", "كتاب الامتحان من ص21 ل  29 بعد سماع فيديو حل المذكرة"],
  "51jPPukv_Sc": ["المذكرة ص٩٤", "كتاب الامتحان من ص٣٠ ل ٣٥", "ص٣٨", "ص٣٩ رقم ١ و ٢ و ٣"],
  "e_bA-FH7Xdk": ["المذكرة", "ص٩٥", "ص٩٦ ماعدا من ٢٧ ل ٣٠", "كتاب الامتحان", "باقي ص٣٩ و ص٤٠ ماعدا ١٠"],
  "CfUeMuymrZE": ["المذكرة", "باقي ص٩٦", "باقي ص٣٢", "كتاب الامتحان", "ص٤٣", "ص٤٤ رقم ٩ و ١٠ و ١١ و ١٢"],
  "kHvHxaXMY3M": ["المذكرة ص35و36 /ص91 رقم 10و11 / ص92 كلها هتعدل رقم 12 (البطارية 24V والمقاومة الاولى ضعف الثانية) / باقي ص97 / ص98", "كتاب الامتحان ص٤٠ رقم ١٠", "ص٤١ و ٤٢ و ٤٤ و ٤٥"],
  "AjfkuDxAtHg": ["المذكرة من ص٩٩ ل ١٠٢", "كتاب الامتحان من ص٤٦ ل ٥٤"],
  "n9bU4aW33y0": ["المذكرة", "ص٩٣", "من ص ١٠٣ ل ١٠٥", "كتاب الامتحان", "من ص٥٥ ل ٦١"],
  "iir90co7DKU": ["المذكرة", "ص١٠٩ من رقم ١ ل ٤", "ص١١١ من رقم ١٨ ل ٢٠", "كتاب الامتحان", "من ص٨٦ ل ٨٨"],
  "Yn9JKOLD-LA": ["المذكرة ص٤١ ماعدا ١٧", "ص٤٢ ماعدا ٣٣ و٣٤", "كتاب الامتحان من ص١٣٩ ل١٤١"],
  "RkGbgGV5BMA": ["المذكرة من ص١٢٧ ل ١٣٢", "كتاب الامتحان من ص١١٥ ل ١١٧"],
  "X-8CqCy5r4Y": ["المذكرة ص١٢٥", "ص١٢٦ ماعدا ٨", "ص١٢٩", "كتاب الامتحان ص١١١", "ص١١٢ ماعدا ٩ و١٠", "ص١١٥ رقم ٢٧", "ص١١٦ رقم ٢٨"],
  "FeAbWLzogoo": ["كتاب الامتحان من ص٦٥ ل ٨٤"],
  "FK--8Rjd7dk": ["المذكرة من ص١١٢ ل ١١٥", "ومن ص١١٨ ل ١٢١", "كتاب الامتحان من ص٦٢ ل ٦٤", "من ص٩٤ ل ٩٦"],
  "g7rgiQ0wycY": ["باقي مذكرة تدريب هام: أوجد R الكلية", "أوجد I", "أوجد V", "أوجد I و V كل مقاومة", "أوجد I الأسلاك", "المذكرة ص١١٦ و١١٧", "كتاب الامتحان ص٩٢ و٩٣"],
  "ve_JawoqRD4": ["المذكرة ص٣٩ و٤٠", "كتاب الامتحان ص١٣٢ و١٣٣", "من ص٥٤ ل٦٣"],
};

const channelUrl = "https://www.youtube.com/@gravity-nouranelsanadiki";

function thumbnail(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function watchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

function formatDate(date: string) {
  if (!date || date.includes("غير متاح")) return "غير متاح";
  return date;
}
function arabicDigits(value: string | number) {
  return String(value).replace(/[0-9]/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]);
}

function categoryIcon(category: Video["category"]) {
  if (category === "حل" || category === "حل إمتحان جزئي" || category === "حل إمتحان شامل") return <Check className="h-3.5 w-3.5" />;
  if (category === "أساسيات") return <FlaskConical className="h-3.5 w-3.5" />;
  return <BookOpen className="h-3.5 w-3.5" />;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof sections)[number]>("الكل");
  const [completed, setCompleted] = useState<string[]>(() => {
    try {
      const saved = window.localStorage.getItem("gravity-completed-videos");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
    } catch {
      return [];
    }
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [homeworkCompleted, setHomeworkCompleted] = useState<string[]>(() => {
    try {
      const saved = window.localStorage.getItem("gravity-homework-completed");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
    } catch {
      return [];
    }
  });

  const [sortNewest, setSortNewest] = useState(true);
  const [solutionFilter, setSolutionFilter] = useState<"حل المذكرة" | "حل كتاب الامتحان" | "حل الامتحانات الجزئية" | "حل الامتحانات الشاملة" | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    try {
      return window.localStorage.getItem("gravity-view-mode") === "list" ? "list" : "grid";
    } catch {
      return "grid";
    }
  });
  const [customVideos, setCustomVideos] = useState<CustomVideo[]>([]);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
  const playerIframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<any>(null);
  const progressTimerRef = useRef<number | null>(null);

  async function copyCode(id: string) {
    try {
      await navigator.clipboard?.writeText(id);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((current) => current === id ? null : current), 1500);
    } catch {
      setCopiedId(null);
    }
  }

  function toggleCompleted(id: string) {
    setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  useEffect(() => {
    window.localStorage.setItem("gravity-completed-videos", JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    window.localStorage.setItem("gravity-homework-completed", JSON.stringify(homeworkCompleted));
  }, [homeworkCompleted]);

  useEffect(() => {
    window.localStorage.setItem("gravity-view-mode", viewMode);
  }, [viewMode]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/videos/custom", { credentials: "include", cache: "no-store" })
      .then(response => response.ok ? response.json() : Promise.reject(new Error("video_service")))
      .then((data: { videos?: CustomVideo[] }) => { if (!cancelled) setCustomVideos(Array.isArray(data.videos) ? data.videos : []); })
      .catch(() => { if (!cancelled) setCustomVideos([]); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!playingVideo) return;

    const iframe = playerIframeRef.current;
    if (!iframe) return;

    const progressKey = `gravity-video-progress-${playingVideo.id}`;
    const setupPlayer = () => {
      if (!window.YT?.Player || !playerIframeRef.current) return;
      playerRef.current = new window.YT.Player(playerIframeRef.current, {
        events: {
          onReady: (event: any) => {
            const savedTime = Number(window.localStorage.getItem(progressKey) || 0);
            if (savedTime > 5) event.target.seekTo(savedTime, true);
            progressTimerRef.current = window.setInterval(() => {
              const currentTime = Math.floor(event.target.getCurrentTime?.() || 0);
              if (currentTime > 0) window.localStorage.setItem(progressKey, String(currentTime));
            }, 1000);
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) window.localStorage.removeItem(progressKey);
          },
        },
      });
    };

    if (window.YT?.Player) {
      setupPlayer();
    } else {
      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.onload = setupPlayer;
        document.body.appendChild(script);
      } else {
        window.setTimeout(setupPlayer, 500);
      }
    }

    return () => {
      if (progressTimerRef.current) window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [playingVideo]);

  function toggleHomework(id: string) {
    setHomeworkCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  const allVideos = useMemo<Video[]>(() => [...videos, ...customVideos].map((video, index) => ({ ...video, number: index + 1 })), [customVideos]);
  const homeworkLookup = useMemo(() => ({ ...homeworkByVideo, ...Object.fromEntries(customVideos.map((video) => [video.id, video.homework || []])) }), [customVideos]);
  const normalizeArabicDigits = (value: string) => value.replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
  const lectureNumberOf = (video: Video) => {
    const match = video.title.match(/^محاضرة\s+([٠-٩0-9]+)/);
    return video.lectureNumber ?? (match ? Number(normalizeArabicDigits(match[1])) : null);
  };
  const filterMatches = (video: Video) => {
    if (activeFilter === "الكل") return video.solutionGroup !== "حل كتاب الامتحان";
    if (activeFilter === "الشرح") return video.section === "الشرح";
    if (activeFilter === "الحل") return video.solutionGroup === "حل المذكرة";
    if (activeFilter === "حل الاختبارات الجزئية") return video.solutionGroup === "حل الامتحانات الجزئية";
    if (activeFilter === "حل الاختبارات الشاملة") return video.solutionGroup === "حل الامتحانات الشاملة";
    return video.solutionGroup === "حل كتاب الامتحان";
  };
  const visibleVideos = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return allVideos
      .filter(filterMatches)
            .filter((video) => !normalized || `${arabicDigits(video.title)} ${arabicDigits(video.lesson)}`.toLowerCase().includes(normalized))
      .sort((a, b) => {
        const aIsExamBook = a.solutionGroup === "حل كتاب الامتحان";
        const bIsExamBook = b.solutionGroup === "حل كتاب الامتحان";
        if (aIsExamBook && bIsExamBook && a.publishedAt && b.publishedAt) {
          const byPublishedAt = Date.parse(a.publishedAt) - Date.parse(b.publishedAt);
          return sortNewest ? -byPublishedAt : byPublishedAt;
        }
        return sortNewest ? b.sortOrder - a.sortOrder : a.sortOrder - b.sortOrder;
      });
  }, [activeFilter, allVideos, query, solutionFilter, sortNewest]);

  const currentYear = new Date().getFullYear();
  const latestLectureVideos = allVideos.filter((video) => lectureNumberOf(video) !== null);
  const latestVideo = latestLectureVideos.reduce((latest, video) => lectureNumberOf(video)! > lectureNumberOf(latest)! ? video : latest, latestLectureVideos[0] ?? allVideos[0]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#080b18] text-[#f7f8ff]" dir="rtl">
      <div className="pointer-events-none fixed inset-0 -z-0 opacity-70">
        <div className="absolute -right-40 -top-56 h-[34rem] w-[34rem] rounded-full bg-[#5d4ff1]/20 blur-[110px]" />
        <div className="absolute -left-48 top-[42rem] h-[30rem] w-[30rem] rounded-full bg-[#1dc8ba]/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(126,111,255,0.10),transparent_42%)]" />
      </div>

      <header className="relative z-10 border-b border-white/[0.08] bg-[#080b18]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="group flex items-center gap-2.5" aria-label="العودة إلى بداية الصفحة">
            <div className="leading-tight">
              <img src={`${import.meta.env.BASE_URL}gravity-logo.svg`} alt="Gravity" className="h-7 w-auto max-w-[9rem] object-contain object-right" />
            </div>
          </a>
        </div>
      </header>

      <main id="top" className="relative z-10">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-20">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b9f51b]/25 bg-[#b9f51b]/10 px-3 py-1.5 text-[11px] font-bold text-[#d1ff68]"><Sparkles className="h-3.5 w-3.5" /> Gravity</div>
            <h1 className="font-display text-5xl font-black leading-[1.04] tracking-tight text-white sm:text-7xl">Gravity <span aria-hidden="true" className="mx-2 inline-block h-12 w-1.5 rounded-full bg-gradient-to-b from-[#b9f51b] via-[#65e5cb] to-[#8d7bff] align-middle shadow-[0_0_18px_rgba(101,229,203,0.45)] sm:mx-4 sm:h-16" /> Nouran Elsanadiki</h1>
            <p className="mt-5 text-xl font-bold tracking-[0.18em] text-[#b9f51b] sm:text-2xl">Physics • 3rd</p>
            
          </div>

          <div className="relative mx-auto w-full max-w-[31rem] lg:ml-auto lg:order-2">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#7367f0]/25 via-transparent to-[#34cfc1]/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#11152b]/90 p-3 shadow-[0_25px_100px_rgba(0,0,0,0.35)]">
              <div className="relative overflow-hidden rounded-[1.45rem] bg-[#1c2140]">
                <img src={thumbnail(latestVideo.id)} alt={latestVideo.title} className="aspect-[4/3] w-full object-cover opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101326] via-[#101326]/10 to-transparent" /><div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-[#0b0e1d]/65 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md"><span className="h-1.5 w-1.5 rounded-full bg-[#48d8ca]" /> آخر فيديو مضاف</div>
                
                <div className="absolute bottom-5 right-5 left-5 flex items-end justify-between gap-4">
                  
                  <button onClick={() => setPlayingVideo(latestVideo)} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#17182b] transition-transform hover:scale-105" aria-label={`تشغيل ${latestVideo.title}`}><Play className="h-4 w-4 fill-current" /></button>
                </div>
              </div>
              <div className="flex items-center justify-end px-2 pb-1 pt-4 text-xs text-[#8f93ac]"><span>Gravity • {arabicDigits(currentYear)}</span></div>
            </div>
            
          </div>
        </section>

        <section id="library" className="border-t border-white/[0.06] bg-[#0b0e1e]/70 px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              
              <div className="relative w-full lg:w-80"><Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737892]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث عن محاضرة أو درس..." className="w-full rounded-2xl border border-white/10 bg-white/[0.045] py-3.5 pl-4 pr-11 text-sm text-white outline-none transition-colors placeholder:text-[#737892] focus:border-[#8d7bff]/60 focus:bg-white/[0.07]" /></div>
            </div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4"><div className="flex flex-wrap gap-2">{sections.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${activeFilter === filter ? "bg-[#e8e6ff] text-[#27205f] shadow-[0_5px_20px_rgba(185,178,255,0.16)]" : "border border-white/10 text-[#aeb2c9] hover:border-white/25 hover:text-white"}`}>{filter}</button>)}</div><div className="flex items-center gap-2"><button onClick={() => setSortNewest(!sortNewest)} className="flex items-center gap-2 text-xs font-bold text-[#8f93ac] transition-colors hover:text-white">{sortNewest ? "تنازلي حسب ترتيب المنصة" : "تصاعدي حسب ترتيب المنصة"}<ChevronDown className={`h-4 w-4 transition-transform ${sortNewest ? "" : "rotate-180"}`} /></button><div className="flex rounded-xl border border-white/10 bg-white/[0.035] p-1" aria-label="طريقة عرض الفيديوهات"><button onClick={() => setViewMode("grid")} className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] font-bold transition-colors ${viewMode === "grid" ? "bg-[#8d7bff]/20 text-[#c4bfff]" : "text-[#737892] hover:text-white"}`} aria-label="عرض شبكي" title="عرض شبكي"><LayoutGrid className="h-3.5 w-3.5" />شبكة</button><button onClick={() => setViewMode("list")} className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] font-bold transition-colors ${viewMode === "list" ? "bg-[#8d7bff]/20 text-[#c4bfff]" : "text-[#737892] hover:text-white"}`} aria-label="عرض قائمة" title="عرض قائمة"><List className="h-3.5 w-3.5" />قائمة</button></div></div></div>{false && <div className="mb-8 rounded-2xl border border-[#ffb76b]/15 bg-[#151326]/80 p-3"><p className="mb-3 text-xs font-bold text-white">اختار نوع الحل</p><div className="mb-3 text-[10px] font-black text-[#d1ff68]">حل الواجب</div><div className="flex flex-wrap gap-2"><button onClick={() => setSolutionFilter("حل المذكرة")} className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${solutionFilter === "حل المذكرة" ? "border-[#8d7bff]/60 bg-[#8d7bff]/20 text-[#c4bfff]" : "border-white/10 text-[#aeb2c9] hover:border-[#8d7bff]/40 hover:text-white"}`}>حل المذكرة</button><button onClick={() => setSolutionFilter("حل كتاب الامتحان")} className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${solutionFilter === "حل كتاب الامتحان" ? "border-[#ffb76b]/60 bg-[#ffb76b]/20 text-[#ffd19d]" : "border-white/10 text-[#aeb2c9] hover:border-[#ffb76b]/40 hover:text-white"}`}>حل كتاب الامتحان</button></div><div className="mb-3 mt-4 text-[10px] font-black text-[#ff9fba]">حل الامتحانات</div><div className="flex flex-wrap gap-2"><button onClick={() => setSolutionFilter("حل الامتحانات الجزئية")} className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${solutionFilter === "حل الامتحانات الجزئية" ? "border-[#ffb76b]/60 bg-[#ffb76b]/20 text-[#ffd19d]" : "border-white/10 text-[#aeb2c9] hover:border-[#ffb76b]/40 hover:text-white"}`}>حل الامتحانات الجزئية</button><button onClick={() => setSolutionFilter("حل الامتحانات الشاملة")} className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${solutionFilter === "حل الامتحانات الشاملة" ? "border-[#f47b9b]/60 bg-[#f47b9b]/20 text-[#ffb0c5]" : "border-white/10 text-[#aeb2c9] hover:border-[#f47b9b]/40 hover:text-white"}`}>حل الامتحانات الشاملة</button></div></div>}
              <div className="mb-6 flex items-center justify-between text-xs text-[#737892]"><span>عرض <strong className="text-[#d7d9e8]">{arabicDigits(visibleVideos.length)}</strong> من {arabicDigits(allVideos.length)} فيديو</span><span className="hidden items-center gap-1.5 sm:flex"><Clock3 className="h-3.5 w-3.5" /> روابط مباشرة إلى يوتيوب</span></div>
            <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold text-white">تقدمك في القائمة</p><p className="mt-1 text-[11px] text-[#737892]">تقدمك محفوظ تلقائيًا على هذا الجهاز.</p></div><div className="flex items-center gap-3"><div className="h-2 w-40 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-l from-[#48d8ca] to-[#8d7bff] transition-all" style={{ width: `${allVideos.length ? (completed.length / allVideos.length) * 100 : 0}%` }} /></div><span className="text-xs font-bold text-[#c4bfff]">{arabicDigits(completed.length)}/{arabicDigits(allVideos.length)}</span></div></div>
            {false && !solutionFilter ? <div className="rounded-3xl border border-dashed border-[#ffb76b]/30 bg-[#151326]/60 py-16 text-center"><p className="font-display text-lg font-black text-white">اختار نوع الحل أولًا</p><p className="mt-2 text-sm text-[#8f93ac]">اختار أحد تصنيفات الحل الأربعة لعرض الفيديوهات المرتبطة به.</p></div> : visibleVideos.length ? <div className={viewMode === "grid" ? "grid items-stretch gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3" : "flex flex-col gap-4"}>{visibleVideos.map((video, index) => <Fragment key={video.id}><article key={video.id} className={`video-card group flex h-full flex-col overflow-hidden rounded-[1.35rem] ${viewMode === "list" ? "md:flex-row" : ""} border shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 ${video.category === "شرح" || video.category === "أساسيات" ? "border-[#8d7bff]/20 bg-gradient-to-br from-[#171737] via-[#13182d] to-[#101427] hover:border-[#8d7bff]/50" : "border-[#ffb76b]/20 bg-gradient-to-br from-[#2a1d24] via-[#17182d] to-[#111421] hover:border-[#ffb76b]/50"}`} style={{ animationDelay: `${Math.min(index * 35, 250)}ms` }}><a href={watchUrl(video.id)} target="_blank" rel="noreferrer" onClick={(event) => { event.preventDefault(); setPlayingVideo(video); }} className={`relative block aspect-video overflow-hidden bg-[#202644] ${viewMode === "list" ? "md:w-80 md:shrink-0 md:aspect-auto" : ""}`}><img src={thumbnail(video.id)} alt={arabicDigits(video.title)} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-90" /><div className="absolute inset-0 bg-gradient-to-t from-[#080b18]/85 via-[#080b18]/10 to-transparent" /><span className="absolute right-3 top-3 rounded-xl border border-white/20 bg-[#080b18]/75 px-2.5 py-1.5 text-xs font-black text-white shadow-lg backdrop-blur-md">{arabicDigits(String(video.lectureNumber ?? video.sortOrder + 1).padStart(2, "0"))}</span><span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#080b18]/85 px-2.5 py-1.5 text-xs font-black text-white shadow-lg backdrop-blur-md"><Clock3 className="h-3.5 w-3.5 text-[#d1ff68]" />{arabicDigits(video.duration || durations[video.id] || (metadata[video.id]?.duration && metadata[video.id]?.duration !== "غير متاح" ? metadata[video.id]?.duration : "غير متاح"))}</span><span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#15172a] opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100"><Play className="h-4 w-4 fill-current" /></span></a><div className="flex flex-1 flex-col p-4"><div className="mb-3 flex items-center justify-between gap-2"><span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${video.category === "حل إمتحان جزئي" ? "bg-[#ffb76b]/10 text-[#ffc98f]" : video.category === "حل إمتحان شامل" ? "bg-[#f47b9b]/10 text-[#ff9fba]" : video.category === "أساسيات" ? "bg-[#48d8ca]/10 text-[#70e3d8]" : "bg-[#8d7bff]/10 text-[#afa7ff]"}`}>{categoryIcon(video.category)}{video.section === "الحل" ? video.solutionGroup : video.category}</span><span className="text-[10px] text-[#737892]">{arabicDigits(video.lesson)}</span></div><h3 className="min-h-[3.4rem] font-display text-base font-bold leading-7 text-white transition-colors group-hover:text-[#c4bfff]">{arabicDigits(video.title)}</h3>{video.section !== "الحل" && homeworkLookup[video.id] ? <div className="mt-3 rounded-2xl border border-[#d1ff68]/20 bg-gradient-to-br from-[#d1ff68]/[0.07] to-[#65e5cb]/[0.025] p-3 shadow-[0_8px_24px_rgba(209,255,104,0.05)]"><div className="mb-2 flex items-center justify-between"><span className="text-[11px] font-black text-[#d1ff68]">الواجب</span><span className="text-[10px] text-[#9ba88e]">{arabicDigits(homeworkLookup[video.id].filter((_, itemIndex) => homeworkCompleted.includes(`${video.id}-${itemIndex}`)).length)}/{arabicDigits(homeworkLookup[video.id].length)}</span></div><ul className="space-y-2">{homeworkLookup[video.id].map((item, itemIndex) => { const homeworkId = `${video.id}-${itemIndex}`; const isDone = homeworkCompleted.includes(homeworkId); return <li key={homeworkId} className={`flex items-start gap-2 text-[11px] leading-5 ${isDone ? "text-[#7c8a74] line-through" : "text-[#d5dbc9]"}`}><input type="checkbox" checked={isDone} onChange={() => toggleHomework(homeworkId)} className="mt-1 h-3.5 w-3.5 shrink-0 accent-[#b9f51b]" aria-label={`إنجاز واجب ${item}`} /><span>{arabicDigits(item)}</span></li>; })}</ul></div> : null}<div className="mt-auto border-t border-white/[0.07] pt-4" /><div className="mt-3 flex items-center justify-between"><span className="text-[11px] text-[#737892]">Gravity - Nouran Elsanadiki</span><div className="flex items-center gap-2"><button onClick={() => copyCode(video.id)} className={`group/copy flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold transition-all active:scale-95 ${copiedId === video.id ? "border-[#48d8ca]/50 bg-[#48d8ca]/15 text-[#70e3d8]" : "border-white/10 text-[#8f93ac] hover:border-[#a8a0ff]/60 hover:bg-[#8d7bff]/10 hover:text-white"}`} title={copiedId === video.id ? "تم النسخ" : "نسخ الكود"} aria-label={copiedId === video.id ? "تم نسخ كود الفيديو" : "نسخ كود الفيديو"}>{copiedId === video.id ? <Check className="h-3.5 w-3.5" /> : <span className="font-mono text-[9px] transition-transform group-hover/copy:-translate-y-0.5">&lt;/&gt;</span>}<span>{copiedId === video.id ? "تم النسخ" : "نسخ"}</span></button><button onClick={() => toggleCompleted(video.id)} className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${completed.includes(video.id) ? "bg-[#48d8ca] text-[#071c1b] shadow-[0_0_18px_rgba(72,216,202,0.3)]" : "border border-white/15 text-[#8f93ac] hover:border-[#48d8ca]/60 hover:bg-[#48d8ca]/10 hover:text-[#70e3d8]"}`}aria-label={completed.includes(video.id) ? "تمت المشاهدة" : "علّم كمكتمل"} title={completed.includes(video.id) ? "تمت المشاهدة" : "علّم كمكتمل"}>{completed.includes(video.id) ? <Check className="h-4 w-4" strokeWidth={3} /> : <span className="block h-3.5 w-3.5 rounded-full border-2 border-current" />}</button><a href={watchUrl(video.id)} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[11px] font-bold text-[#a8a0ff] hover:text-white">شاهد <ArrowUpLeft className="h-3 w-3" /></a></div></div></div></article></Fragment>)}</div> : <div className="rounded-3xl border border-dashed border-white/15 py-20 text-center"><Search className="mx-auto mb-4 h-8 w-8 text-[#737892]" /><p className="font-bold text-white">مفيش نتائج مطابقة</p><p className="mt-2 text-sm text-[#8f93ac]">جرّب كلمة مختلفة أو اختار تصنيف تاني.</p></div>}
          </div>
        </section>

      </main>


      {playingVideo ? <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#030510]/85 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={`تشغيل ${arabicDigits(playingVideo.title)}`}><div className="relative my-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-[#0d1125] shadow-2xl"><button onClick={() => setPlayingVideo(null)} className="absolute left-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#080b18]/80 text-white transition-colors hover:bg-[#8d7bff]" aria-label="إغلاق المشغل"><X className="h-5 w-5" /></button><div className="aspect-video bg-black"><iframe ref={playerIframeRef} className="h-full w-full" src={`https://www.youtube.com/embed/${playingVideo.id}?autoplay=1&rel=0&enablejsapi=1`} title={arabicDigits(playingVideo.title)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div className="space-y-4 p-4" dir="rtl"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs text-[#8f93ac]">تشغيل سريع داخل الموقع — يتم حفظ تقدمك تلقائيًا</p><h2 className="mt-1 font-display text-base font-black text-white">{arabicDigits(playingVideo.title)}</h2></div><a href={watchUrl(playingVideo.id)} target="_blank" rel="noreferrer" className="shrink-0 text-xs font-bold text-[#c4bfff] hover:text-white">فتح على يوتيوب <ExternalLink className="mr-1 inline h-3.5 w-3.5" /></a></div>{playingVideo.section !== "الحل" && homeworkLookup[playingVideo.id] ? <div className="rounded-2xl border border-[#d1ff68]/20 bg-gradient-to-br from-[#d1ff68]/[0.07] to-[#65e5cb]/[0.025] p-3"><div className="mb-3 flex items-center justify-between"><span className="text-xs font-black text-[#d1ff68]">واجب الفيديو</span><span className="text-[11px] text-[#9ba88e]">{arabicDigits(homeworkLookup[playingVideo.id].filter((_, itemIndex) => homeworkCompleted.includes(`${playingVideo.id}-${itemIndex}`)).length)}/{arabicDigits(homeworkLookup[playingVideo.id].length)} مكتمل</span></div><ul className="grid gap-2 sm:grid-cols-2">{homeworkLookup[playingVideo.id].map((item, itemIndex) => { const homeworkId = `${playingVideo.id}-${itemIndex}`; const isDone = homeworkCompleted.includes(homeworkId); return <li key={homeworkId} className={`flex items-start gap-2 text-xs leading-5 ${isDone ? "text-[#7c8a74] line-through" : "text-[#d5dbc9]"}`}><input type="checkbox" checked={isDone} onChange={() => toggleHomework(homeworkId)} className="mt-1 h-4 w-4 shrink-0 accent-[#b9f51b]" aria-label={`إنجاز واجب ${item}`} /><span>{arabicDigits(item)}</span></li>; })}</ul></div> : <p className="text-xs text-[#737892]">لا يوجد واجب مسجل لهذا الفيديو.</p>}</div></div></div> : null}
      <footer className="border-t border-white/[0.07] px-5 py-7 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-xs text-[#737892] sm:flex-row sm:text-right"><span>© {arabicDigits(currentYear)} Gravity Learning Library</span></div></footer>
    </div>
  );
}

export { videos };
