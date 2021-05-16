import { format } from "date-fns"
import { getAllPosts, PostData } from "lib/data/posts/getAllPosts"
import { getAllProjects, ProjectData } from "lib/data/projects/getAllProjects"
import { NextApiRequest, NextApiResponse } from "next"
import nodeHtmlToImage from "node-html-to-image"

export default async function ogImageHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { type, slug } = req.query

    let metadata: PostData | ProjectData | undefined

    switch (type) {
        case "blog":
            const post = getAllPosts().find((post) => post.slug === slug)
            metadata = post
            break
        case "projects":
            const project = getAllProjects().find(
                (project) => project.slug === slug
            )
            metadata = project
            break
        default:
            return res.status(400).end()
    }

    if (!metadata) {
        return res.status(404).end()
    }

    let badge = ""

    if ("category" in metadata) {
        badge = /* HTML */ `<div
            style="
                padding: 8px 24px;
                background-color: #6366f1;
                font-weight: bold;
                color: #eef2ff;
                border-radius: 40px;
                font-size: 24px;
                margin-bottom: 30px;
            "
        >
            ${metadata.category}
        </div>`
    }

    const image = await nodeHtmlToImage({
        html: /* HTML */ `<html>
            <head>
                <meta charset="UTF-8" />
                <style>
                    @import url("https://rsms.me/inter/inter.css");
                    html {
                        font-family: "Inter", sans-serif;
                    }
                    @supports (font-variation-settings: normal) {
                        html {
                            font-family: "Inter var", sans-serif;
                        }
                    }

                    body {
                        margin: 0;
                        background-color: #f9fafb;
                    }
                </style>
            </head>

            <body>
                <div
                    style="
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background-color: #f9fafb;
                    "
                >
                    <div style="height: 12px; background-color: #818cf8;"></div>
                    <div
                        style="flex: 1; padding: 64px; display: flex; flex-direction: column;"
                    >
                        <div style="display: flex; flex: 1;">
                            <div
                                style="
                                    display: flex;
                                    flex-direction: column;
                                    align-items: flex-start;
                                "
                            >
                                ${badge}
                                <div
                                    style="
                                        font-size: 58px;
                                        font-weight: bold;
                                        line-height: 1.1;
                                        color: #111827;
                                    "
                                >
                                    ${metadata.title}
                                </div>
                                <div
                                    style="
                                        font-size: 32px;
                                        line-height: 1.5;
                                        color: #6b7280;
                                        margin: 22px 0 0;
                                        display: -webkit-box;
                                        -webkit-line-clamp: 2;
                                        -webkit-box-orient: vertical;  
                                        overflow: hidden;
                                    "
                                >
                                    ${metadata.intro}
                                </div>
                            </div>
                            <img
                                id="image0"
                                width="200"
                                height="200"
                                style="border-radius: 12px; margin-left: 40px;"
                                src="data:image/jpeg;base64,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"
                            />
                        </div>
                        <div style="display: flex;">
                            <div style="display: flex; align-items: center;">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    viewbox="0 0 24 24"
                                    fill="none"
                                    stroke="#9CA3AF"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                                <div
                                    style="font-size: 28px; margin-left: 12px; color: #6b7280;"
                                >
                                    ${metadata.readTime} min read
                                </div>
                            </div>
                            <div
                                style="display: flex; align-items: center; margin-left: 80px;"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    viewbox="0 0 24 24"
                                    fill="none"
                                    stroke="#9CA3AF"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-calendar"
                                >
                                    <rect
                                        x="3"
                                        y="4"
                                        width="18"
                                        height="18"
                                        rx="2"
                                        ry="2"
                                    />
                                    <path d="M16 2v4M8 2v4M3 10h18" />
                                </svg>
                                <div
                                    style="font-size: 28px; margin-left: 12px; color: #6b7280;"
                                >
                                    ${format(
                                        new Date(metadata.publishDate),
                                        "MMMM d, y"
                                    )}
                                </div>
                            </div>
                            <div style="flex: 1;"></div>
                            <svg
                                width="52"
                                height="35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.947 26.35h12.046V35H0V0h8.947v26.35z"
                                    fill="#4338CA"
                                />
                                <path
                                    d="M35.006 0c4.831 0 8.863 1.683 12.096 5.05C50.367 8.383 52 12.533 52 17.5s-1.633 9.133-4.898 12.5c-3.233 3.333-7.265 5-12.096 5H20.76V0h14.245zm0 26.35c2.432 0 4.415-.8 5.948-2.4 1.532-1.633 2.299-3.783 2.299-6.45 0-2.667-.767-4.8-2.3-6.4-1.532-1.633-3.515-2.45-5.947-2.45h-5.049v17.7h5.049z"
                                    fill="#4338CA"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </body>
        </html>`,
        puppeteerArgs: { defaultViewport: { width: 1200, height: 600 } },
    })

    res.setHeader(
        "Cache-Control",
        "s-maxage=3600, stale-while-revalidate=30000000"
    )
    res.setHeader("Content-Type", "image/png")
    return res.status(200).end(image, "binary")
}
