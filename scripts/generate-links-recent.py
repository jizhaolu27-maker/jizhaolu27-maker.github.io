#!/usr/bin/env python3
"""Generate recent links for links.html from configurable official sources."""

from __future__ import annotations

import json
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen

DEFAULT_LIMIT = 5
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "data" / "links-recent.json"
ATOM_NS = {"atom": "http://www.w3.org/2005/Atom"}

# Add future sources here. Each source only needs to return title + url + source,
# while the generator handles deduplication and global limiting.
SOURCES = [
    {
        "id": "llvm-github-releases",
        "label": "LLVM",
        "kind": "atom",
        "url": "https://github.com/llvm/llvm-project/releases.atom",
        "item_limit": 5,
        "enabled": True,
    }
]


def fetch_bytes(url: str) -> bytes:
    request = Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; links-generator/1.0; +https://github.com/jizhaolu27-maker/jizhaolu27-maker.github.io)"
        },
    )
    with urlopen(request, timeout=20) as response:
        return response.read()


def parse_atom_entries(source: dict) -> list[dict[str, object]]:
    root = ET.fromstring(fetch_bytes(source["url"]))
    items: list[dict[str, object]] = []

    for entry in root.findall("atom:entry", ATOM_NS):
        title = entry.findtext("atom:title", default="", namespaces=ATOM_NS).strip()
        link = entry.find("atom:link", ATOM_NS)
        href = link.get("href", "").strip() if link is not None else ""
        published_text = entry.findtext("atom:published", default="", namespaces=ATOM_NS).strip()
        updated_text = entry.findtext("atom:updated", default="", namespaces=ATOM_NS).strip()
        timestamp_text = published_text or updated_text

        if not title or not href:
            continue

        items.append(
            {
                "title": title,
                "source": source["label"],
                "url": href,
                "published": parse_timestamp(timestamp_text),
            }
        )

        if len(items) >= int(source.get("item_limit", DEFAULT_LIMIT)):
            break

    return items


def parse_timestamp(value: str) -> datetime:
    if not value:
        return datetime.min.replace(tzinfo=timezone.utc)

    normalized = value.replace("Z", "+00:00")
    return datetime.fromisoformat(normalized)


HANDLERS = {
    "atom": parse_atom_entries,
}


def collect_items() -> list[dict[str, str]]:
    collected: list[dict[str, object]] = []

    for source in SOURCES:
        if not source.get("enabled", True):
            continue

        kind = source.get("kind")
        handler = HANDLERS.get(kind)
        if handler is None:
            raise RuntimeError(f"Unsupported source kind: {kind}")

        collected.extend(handler(source))

    collected.sort(key=lambda item: item["published"], reverse=True)

    unique_items: list[dict[str, str]] = []
    seen_urls: set[str] = set()

    for item in collected:
        url = str(item["url"])
        if url in seen_urls:
            continue

        seen_urls.add(url)
        unique_items.append(
            {
                "title": str(item["title"]),
                "source": str(item["source"]),
                "url": url,
            }
        )

        if len(unique_items) >= DEFAULT_LIMIT:
            break

    return unique_items


def main() -> int:
    items = collect_items()
    if not items:
        raise RuntimeError("No recent links were generated from the configured sources.")

    OUTPUT_PATH.write_text(json.dumps(items, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {len(items)} items to {OUTPUT_PATH}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        raise SystemExit(1)
