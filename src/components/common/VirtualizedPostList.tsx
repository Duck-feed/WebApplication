import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";
import { List, type ListImperativeAPI, type RowComponentProps } from "react-window";
import PostCard from "@/features/post/components/PostCard";
import type { Post } from "@/features/post/types";

const DEFAULT_ITEM_HEIGHT = 360;
const SENTINEL_HEIGHT = 96;
const MIN_VIEWPORT_HEIGHT = 320;
const MAX_VIEWPORT_HEIGHT = 720;
const VIEWPORT_OFFSET = 260;

type VirtualizedPostListProps = Readonly<{
  posts: Post[];
  loadMore: () => void;
  hasMore: boolean;
  loadingMore: boolean;
  topContent?: ReactNode;
  className?: string;
}>;

type AdditionalRowProps = {
  posts: Post[];
  setSize: (index: number, size: number) => void;
  loadMore: () => void;
  hasMore: boolean;
  loadingMore: boolean;
  getObserverRoot: () => Element | null;
  topContent: ReactNode | null;
};

type VirtualizedRowProps = RowComponentProps<AdditionalRowProps>;

const getViewportHeight = () => {
  if (typeof window === "undefined") return MAX_VIEWPORT_HEIGHT;
  const available = window.innerHeight - VIEWPORT_OFFSET;
  if (!Number.isFinite(available)) return MAX_VIEWPORT_HEIGHT;
  return Math.max(MIN_VIEWPORT_HEIGHT, Math.min(MAX_VIEWPORT_HEIGHT, available));
};

export default function VirtualizedPostList({
  posts,
  loadMore,
  hasMore,
  loadingMore,
  topContent,
  className,
}: VirtualizedPostListProps) {
  const listRef = useRef<ListImperativeAPI | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sizeMapRef = useRef<Map<number, number>>(new Map());
  const [sizeVersion, setSizeVersion] = useState(0);
  const [width, setWidth] = useState(() => 640);
  const [height, setHeight] = useState(() => getViewportHeight());

  const setSize = useCallback((index: number, size: number) => {
    if (size <= 0) return;
    const rounded = Math.ceil(size);
    const current = sizeMapRef.current.get(index);
    if (current === rounded) return;
    sizeMapRef.current.set(index, rounded);
    setSizeVersion((value) => value + 1);
  }, []);

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateWidth = () => setWidth(node.clientWidth || 640);
    updateWidth();

    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setHeight(getViewportHeight());
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getObserverRoot = useCallback(() => listRef.current?.element ?? null, []);

  const rowHeight = useCallback(
    (index: number) => {
      const offset = topContent ? 1 : 0;
      const sentinelIndex = posts.length + offset;
      if (index === sentinelIndex) return SENTINEL_HEIGHT;
      return sizeMapRef.current.get(index) ?? DEFAULT_ITEM_HEIGHT;
    },
    [posts.length, topContent, sizeVersion],
  );

  const rowProps = useMemo<AdditionalRowProps>(
    () => ({
      posts,
      setSize,
      loadMore,
      hasMore,
      loadingMore,
      getObserverRoot,
      topContent: topContent ?? null,
    }),
    [posts, setSize, loadMore, hasMore, loadingMore, getObserverRoot, topContent],
  );

  const itemCount = posts.length + 1 + (topContent ? 1 : 0);

  return (
    <div ref={containerRef} className={className}>
      <List
        className="w-full"
        listRef={listRef}
        defaultHeight={height}
        rowComponent={RowComponent}
        rowCount={itemCount}
        rowHeight={rowHeight}
        rowProps={rowProps}
        overscanCount={2}
        style={{ height, width }}
      />
    </div>
  );
}

function RowComponent({ ariaAttributes, index, style, ...rest }: VirtualizedRowProps) {
  const { posts, setSize, loadMore, hasMore, loadingMore, getObserverRoot, topContent } = rest;
  const hasTopContent = Boolean(topContent);
  const postOffset = hasTopContent ? 1 : 0;
  const sentinelIndex = posts.length + postOffset;

  if (hasTopContent && index === 0) {
    return (
      <TopContentRow
        style={style}
        ariaAttributes={ariaAttributes}
        topContent={topContent}
        setSize={(size) => setSize(index, size)}
      />
    );
  }

  if (index === sentinelIndex) {
    return (
      <SentinelRow
        style={style}
        ariaAttributes={ariaAttributes}
        loadMore={loadMore}
        hasMore={hasMore}
        loadingMore={loadingMore}
        getObserverRoot={getObserverRoot}
        setSize={(size) => setSize(index, size)}
      />
    );
  }

  const postIndex = index - postOffset;
  const post = posts[postIndex];

  return (
    <PostRow
      style={style}
      ariaAttributes={ariaAttributes}
      post={post}
      setSize={(size) => setSize(index, size)}
    />
  );
}

type PostRowProps = Readonly<{
  style: CSSProperties;
  ariaAttributes: VirtualizedRowProps["ariaAttributes"];
  post: Post;
  setSize: (size: number) => void;
}>;

function PostRow({ style, ariaAttributes, post, setSize }: PostRowProps) {
  const rowRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const node = rowRef.current;
    if (!node) return;

    const measure = () => {
      setSize(node.getBoundingClientRect().height);
    };

    measure();

    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(measure);
    observer.observe(node);

    return () => observer.disconnect();
  }, [setSize, post]);

  return (
    <div style={style} {...ariaAttributes}>
      <div ref={rowRef} className="flex justify-center pb-3">
        <PostCard {...post} />
      </div>
    </div>
  );
}

type TopContentRowProps = Readonly<{
  style: CSSProperties;
  ariaAttributes: VirtualizedRowProps["ariaAttributes"];
  topContent: ReactNode | null;
  setSize: (size: number) => void;
}>;

function TopContentRow({ style, ariaAttributes, topContent, setSize }: TopContentRowProps) {
  const rowRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const node = rowRef.current;
    if (!node) return;

    const measure = () => {
      setSize(node.getBoundingClientRect().height);
    };

    measure();

    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(measure);
    observer.observe(node);

    return () => observer.disconnect();
  }, [setSize, topContent]);

  return (
    <div style={style} {...ariaAttributes}>
      <div ref={rowRef} className="flex flex-col items-center gap-4 pb-3">
        {topContent}
      </div>
    </div>
  );
}

type SentinelRowProps = Readonly<{
  style: CSSProperties;
  ariaAttributes: VirtualizedRowProps["ariaAttributes"];
  loadMore: () => void;
  hasMore: boolean;
  loadingMore: boolean;
  getObserverRoot: () => Element | null;
  setSize: (size: number) => void;
}>;

function SentinelRow({
  style,
  ariaAttributes,
  loadMore,
  hasMore,
  loadingMore,
  getObserverRoot,
  setSize,
}: SentinelRowProps) {
  const observerRoot = getObserverRoot();
  const { ref, inView } = useInView({
    root: observerRoot ?? undefined,
    rootMargin: "0px 0px 200px 0px",
  });

  useEffect(() => {
    if (inView && hasMore && !loadingMore) {
      loadMore();
    }
  }, [inView, hasMore, loadingMore, loadMore]);

  useEffect(() => {
    setSize(SENTINEL_HEIGHT);
  }, [setSize]);

  return (
    <div style={style} {...ariaAttributes}>
      <div ref={ref} className="flex h-full items-center justify-center py-4 text-sm text-gray-500">
        {loadingMore
          ? "Loading more posts..."
          : hasMore
            ? "Keep scrolling to load more"
            : "You're all caught up"}
      </div>
    </div>
  );
}
