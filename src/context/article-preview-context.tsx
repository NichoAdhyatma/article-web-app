// lib/contexts/article-preview-context.tsx
"use client";

import { CreateArticleForm } from "@/lib/schemas/article/article-schema";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const STORAGE_KEY = "articlePreview";

interface ArticlePreview extends CreateArticleForm {
  thumbnailPreview: string;
}

type ArticlePreviewContextType = {
  article: ArticlePreview | null;
  setArticle: (article: CreateArticleForm) => void;
  clearArticle: () => void;
};

const ArticlePreviewContext = createContext<
  ArticlePreviewContextType | undefined
>(undefined);

export const ArticlePreviewProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [article, setArticleState] = useState<ArticlePreview | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setArticleState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse articlePreview from localStorage:", e);
      }
    }
  }, []);

  const convertFileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("Failed to convert file to base64");
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const setArticle = async (article: CreateArticleForm) => {
    let thumbnailData: string;

    if (typeof article.thumbnail === "string") {
      thumbnailData = article.thumbnail;
    } else if (article.thumbnail instanceof File) {
      thumbnailData = await convertFileToBase64(article.thumbnail);
    } else {
      thumbnailData = "https://placehold.co/600x400";
    }

    const newArticle = {
      title: article.title,
      content: article.content,
      category: article.category,
      thumbnail: article.thumbnail,
      thumbnailPreview: thumbnailData,
    };

    setArticleState(newArticle);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        title: article.title,
        content: article.content,
        category: article.category,
      })
    );
  };

  const clearArticle = () => {
    setArticleState(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ArticlePreviewContext.Provider
      value={{ article, setArticle, clearArticle }}
    >
      {children}
    </ArticlePreviewContext.Provider>
  );
};

export const useArticlePreview = () => {
  const context = useContext(ArticlePreviewContext);
  if (!context)
    throw new Error(
      "useArticlePreview must be used within ArticlePreviewProvider"
    );
  return context;
};
