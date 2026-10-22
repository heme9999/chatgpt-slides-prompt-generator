CREATE TABLE IF NOT EXISTS usage_counts (
  day TEXT NOT NULL,
  event TEXT NOT NULL,
  template TEXT NOT NULL,
  lang TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, event, template, lang)
) WITHOUT ROWID;
