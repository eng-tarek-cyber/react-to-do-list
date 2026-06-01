# TODO

## المرحلة 1: Dark Mode + UI Modern
- [x] مراجعة وتأكيد عدم وجود أخطاء/Warnings متعلقة بالكود الحالي
- [x] تطبيق Dark Mode على مستوى التطبيق (UI-only) بدون التأثير على `tasks` في localStorage
  - [x] حفظ تفضيل الثيم في localStorage بمفتاح مستقل (مثلاً `theme`)
  - [x] ضبط ألوان الخلفيات/النصوص/البطاقات والأزرار في Dark Mode
- [x] تحسين الستايل العام: نقل بعض inline styles إلى CSS، وإضافة Hover/Focus effects ناعمة

## المرحلة 2: Best Practices / Performance
- [ ] تحسين قراءة/كتابة localStorage مع try/catch لحماية من JSON corrupt
- [ ] استخدام useMemo/useCallback للأجزاء الحساسة (فلترة المهام + handlers)
- [ ] حماية عمليات التعديل (handleSaveEdit) إذا selectedTodo null

## المرحلة 3: Drag & Drop للترتيب (ميزة لاحقة)
- [ ] اقتراح schema/تعديل بسيط لتخزين ترتيب المهام
- [ ] إضافة مكتبة dnd (مثل @dnd-kit) وتحديث UI
- [ ] ضمان توافق localStorage بعد التغيير

