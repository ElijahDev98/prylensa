import{i as e,t}from"./jsx-runtime-DUAcabCT.js";import{b as n,c as r,f as i,g as a,h as o}from"./settings-E1ShGx4L.js";import{n as s,r as c,t as l}from"./recommendation-navigation-BRTI1zEA.js";import{a as u,i as d,n as f,o as p,r as m,t as h}from"./Card-Dh7-pkuz.js";import{n as g,t as _}from"./useDashboard-B3RSHKm7.js";import{C as v,_ as y}from"./index-DXJsqhMe.js";import{t as b}from"./charts-OxOBNkmZ.js";var x=a(`arrow-down-right`,[[`path`,{d:`m7 7 10 10`,key:`1fmybs`}],[`path`,{d:`M17 7v10H7`,key:`6fjiku`}]]),S=a(`arrow-right-left`,[[`path`,{d:`m16 3 4 4-4 4`,key:`1x1c3m`}],[`path`,{d:`M20 7H4`,key:`zbl0bi`}],[`path`,{d:`m8 21-4-4 4-4`,key:`h9nckh`}],[`path`,{d:`M4 17h16`,key:`g4d7ey`}]]),C=a(`arrow-up-right`,[[`path`,{d:`M7 7h10v10`,key:`1tivn9`}],[`path`,{d:`M7 17 17 7`,key:`1vkiza`}]]),w=a(`package`,[[`path`,{d:`M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z`,key:`1a0edw`}],[`path`,{d:`M12 22V12`,key:`d0xqtd`}],[`polyline`,{points:`3.29 7 12 12 20.71 7`,key:`ousv84`}],[`path`,{d:`m7.5 4.27 9 5.15`,key:`1c824w`}]]),T=t();function E({refreshing:e,lastUpdated:t,onRefresh:n}){let r=new Intl.DateTimeFormat(`en-NG`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}).format(new Date),a=t===null?`Live marketplace data`:`Updated ${new Intl.DateTimeFormat(`en-NG`,{hour:`2-digit`,minute:`2-digit`}).format(t)}`;return(0,T.jsxs)(`header`,{className:`\r
        flex\r
        flex-col\r
        gap-6\r
        rounded-3xl\r
        border\r
        border-slate-200\r
        bg-white\r
        p-6\r
        shadow-sm\r
        lg:flex-row\r
        lg:items-center\r
        lg:justify-between\r
      `,children:[(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`p`,{className:`text-sm font-medium text-blue-600`,children:r}),(0,T.jsx)(`h1`,{className:`\r
            mt-2\r
            text-3xl\r
            font-bold\r
            tracking-tight\r
            text-slate-900\r
          `,children:`Dashboard`}),(0,T.jsx)(`p`,{className:`mt-2 text-slate-500`,children:`Monitor live market trends, product quality and buying signals in one place.`}),(0,T.jsx)(`p`,{className:`mt-3 text-sm font-medium text-slate-500`,children:a})]}),(0,T.jsxs)(`button`,{type:`button`,onClick:n,disabled:e,className:`
          inline-flex
          items-center
          justify-center\r
          gap-2\r
          rounded-2xl\r
          border\r
          border-slate-300\r
          px-5\r
          py-3\r
          font-medium\r
          text-slate-700\r
          transition-colors
          duration-200
          hover:bg-slate-100
          disabled:cursor-not-allowed
          disabled:opacity-60
        `,children:[(0,T.jsx)(i,{size:18,className:e?`animate-spin`:void 0}),e?`Refreshing`:`Refresh`]})]})}function D({metric:e}){let t=e.icon;return(0,T.jsxs)(h,{className:`\r
        rounded-3xl\r
        p-5\r
        transition-all\r
        duration-200\r
        hover:-translate-y-1\r
        hover:shadow-md\r
      `,children:[(0,T.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,T.jsx)(`div`,{className:`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            ${e.iconBackground}
          `,children:(0,T.jsx)(t,{size:22,className:e.iconColor})}),(0,T.jsx)(`p`,{className:`\r
            text-sm\r
            font-medium\r
            text-slate-500\r
          `,children:e.label})]}),(0,T.jsx)(`h2`,{className:`\r
          mt-5\r
          text-3xl\r
          font-bold\r
          tracking-tight\r
          text-slate-900\r
        `,children:e.valueLabel}),(0,T.jsxs)(`div`,{className:`
          mt-4
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          ${e.trendColor}
        `,children:[e.isPositiveTrend?(0,T.jsx)(g,{size:16}):(0,T.jsx)(v,{size:16}),(0,T.jsx)(`span`,{children:e.changeLabel})]})]})}function O({metrics:e}){return(0,T.jsx)(`section`,{"aria-label":`Dashboard Metrics`,className:`\r
        grid\r
        gap-6\r
        grid-cols-1\r
        sm:grid-cols-2\r
        xl:grid-cols-4\r
      `,children:e.map(e=>(0,T.jsx)(D,{metric:e},e.id))})}function k({children:e,className:t=``}){return(0,T.jsx)(h,{className:`
        rounded-3xl
        h-full
        p-6
        ${t}
      `,children:e})}function A({title:e,description:t,actionLabel:n,onAction:r}){return(0,T.jsxs)(`header`,{className:`\r
        mb-6\r
        flex\r
        items-center\r
        justify-between\r
        gap-4\r
      `,children:[(0,T.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,T.jsx)(`h2`,{className:`\r
            text-lg\r
            font-semibold\r
            text-slate-900\r
          `,children:e}),(0,T.jsx)(`p`,{className:`\r
            mt-1\r
            text-sm\r
            leading-6\r
            text-slate-500\r
          `,children:t})]}),n&&(0,T.jsx)(`button`,{type:`button`,onClick:r,className:`\r
            shrink-0\r
            rounded-lg\r
            px-2\r
            py-1.5\r
            text-sm\r
            font-medium\r
            text-slate-600\r
            transition-colors\r
            hover:bg-blue-50\r
            hover:text-blue-700\r
          `,children:n})]})}function j({recommendation:e}){let t=y();return(0,T.jsx)(`article`,{className:`\r
        border-b\r
        border-slate-200\r
        py-5\r
        transition-colors\r
        duration-200\r
        hover:bg-slate-50\r
        first:pt-0\r
        last:border-b-0\r
        last:pb-0\r
      `,children:(0,T.jsxs)(`div`,{className:`flex items-start gap-4`,children:[(0,T.jsx)(`div`,{className:`\r
            flex\r
            h-11\r
            w-11\r
            shrink-0\r
            items-center\r
            justify-center\r
            rounded-2xl\r
            bg-blue-100\r
          `,children:(0,T.jsx)(r,{size:20,className:`text-blue-600`})}),(0,T.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,T.jsxs)(`div`,{className:`\r
              flex\r
              flex-wrap\r
              items-center\r
              gap-2\r
            `,children:[(0,T.jsx)(`span`,{className:`\r
                text-xs\r
                font-semibold\r
                uppercase\r
                tracking-wide\r
                text-slate-400\r
              `,children:`AI Insight`}),(0,T.jsx)(`span`,{className:`
                rounded-full
                px-2.5
                py-1
                text-xs
                font-semibold
                uppercase
                ${e.badgeColor}
              `,children:e.priority})]}),(0,T.jsx)(`h3`,{className:`\r
              mt-2\r
              text-base\r
              font-semibold\r
              text-slate-900\r
            `,children:e.title}),(0,T.jsx)(`p`,{className:`\r
              mt-2\r
              text-sm\r
              leading-6\r
              text-slate-500\r
            `,children:e.description}),(0,T.jsxs)(`button`,{type:`button`,onClick:()=>t(s(e)),className:`mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700`,children:[l(e),(0,T.jsx)(o,{size:15})]})]})]})})}var M=e(n(),1);function N({recommendations:e}){let[t,n]=(0,M.useState)(!1),r=t?e:e.slice(0,2);return(0,T.jsxs)(`section`,{children:[(0,T.jsx)(A,{title:`AI Recommendations`,description:`AI-powered suggestions based on market trends.`,actionLabel:e.length>2?t?`Show Less`:`View All`:void 0,onAction:()=>n(e=>!e)}),e.length===0?(0,T.jsx)(`p`,{className:`text-sm text-slate-500`,children:`Recommendations will appear after live marketplace data loads.`}):(0,T.jsx)(`div`,{children:r.map(e=>(0,T.jsx)(j,{recommendation:e},e.id))})]})}function P({alert:e}){let t=e.direction===`down`;return(0,T.jsxs)(`article`,{className:`\r
        flex flex-col\r
        py-5\r
        border-b border-slate-200\r
        transition-colors\r
        gap-5 duration-200 hover:bg-slate-50 first:pt-0 last:border-b-0 last:pb-0\r
        md:flex-row md:items-start md:justify-between\r
      `,children:[(0,T.jsxs)(`div`,{className:`\r
          flex-1\r
          min-w-0\r
        `,children:[(0,T.jsx)(`h3`,{className:`\r
            text-base font-semibold text-slate-900\r
            truncate\r
          `,children:e.product}),(0,T.jsx)(`div`,{className:`\r
            inline-flex\r
            mt-3 px-3 py-1\r
            text-xs font-medium text-slate-600\r
            bg-slate-100\r
            rounded-full\r
            items-center\r
          `,children:e.store})]}),(0,T.jsxs)(`div`,{className:`\r
          flex flex-col\r
          shrink-0 items-start gap-3\r
          md:items-end\r
        `,children:[(0,T.jsxs)(`div`,{className:`\r
            text-left\r
            md:text-right\r
          `,children:[(0,T.jsx)(`p`,{className:`\r
              text-xs font-medium tracking-wide text-slate-400\r
              uppercase\r
            `,children:`Current Price`}),(0,T.jsx)(`p`,{className:`\r
              mt-1\r
              text-lg font-bold text-slate-900\r
            `,children:e.currentPriceLabel})]}),(0,T.jsxs)(`div`,{className:`\r
            mt-4\r
            text-left\r
            md:text-right\r
          `,children:[(0,T.jsx)(`p`,{className:`\r
              text-xs font-medium tracking-wide text-slate-400\r
              uppercase\r
            `,children:`Previous Price`}),(0,T.jsx)(`p`,{className:`\r
              mt-1\r
              text-sm text-slate-500\r
              line-through\r
            `,children:e.previousPriceLabel})]}),(0,T.jsxs)(`span`,{className:`
            inline-flex
            mt-4 px-3 py-1.5
            text-xs font-semibold
            rounded-full
            items-center gap-2
            ${t?`bg-emerald-100 text-emerald-700`:`bg-red-100 text-red-700`}
          `,children:[t?(0,T.jsx)(x,{size:15}):(0,T.jsx)(C,{size:15}),t?`Price Drop`:`Price Increase`]})]})]})}function F({alerts:e}){let[t,n]=(0,M.useState)(!1),r=t?e:e.slice(0,2);return(0,T.jsxs)(`section`,{children:[(0,T.jsx)(A,{title:`Price Alerts`,description:`Recent price movements from monitored products.`,actionLabel:e.length>2?t?`Show Less`:`View All`:void 0,onAction:()=>n(e=>!e)}),e.length===0?(0,T.jsx)(`p`,{className:`text-sm text-slate-500`,children:`No live price movements are available yet.`}):(0,T.jsx)(`div`,{children:r.map(e=>(0,T.jsx)(P,{alert:e},e.id))})]})}function I({comparison:e}){return(0,T.jsxs)(`article`,{className:`\r
        flex\r
        flex-col\r
        gap-5\r
        border-b\r
        border-slate-200\r
        py-5\r
        transition-colors\r
        duration-200\r
        hover:bg-slate-50\r
        md:flex-row\r
        md:items-start\r
        md:justify-between\r
        first:pt-0\r
        last:border-b-0\r
        last:pb-0\r
      `,children:[(0,T.jsxs)(`div`,{className:`flex min-w-0 flex-1 gap-4`,children:[(0,T.jsx)(`div`,{className:`\r
            flex\r
            h-11\r
            w-11\r
            shrink-0\r
            items-center\r
            justify-center\r
            rounded-2xl\r
            bg-slate-100\r
          `,children:(0,T.jsx)(S,{size:20,className:`text-slate-600`})}),(0,T.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,T.jsx)(`h3`,{className:`\r
              truncate\r
              text-base\r
              font-semibold\r
              text-slate-900\r
            `,children:e.product}),(0,T.jsxs)(`div`,{className:`\r
              mt-3\r
              inline-flex\r
              items-center\r
              rounded-full\r
              bg-slate-100\r
              px-3\r
              py-1\r
              text-xs\r
              font-medium\r
              text-slate-600\r
            `,children:[`Compared across `,e.comparedStoresLabel]})]})]}),(0,T.jsxs)(`div`,{className:`\r
          flex\r
          shrink-0\r
          flex-col\r
          items-start\r
          gap-3\r
          md:items-end\r
        `,children:[(0,T.jsxs)(`div`,{className:`text-left md:text-right`,children:[(0,T.jsx)(`p`,{className:`\r
              text-xs\r
              font-medium\r
              uppercase\r
              tracking-wide\r
              text-slate-400\r
            `,children:`Best Price`}),(0,T.jsx)(`p`,{className:`\r
              mt-1\r
              whitespace-nowrap\r
              text-lg\r
              font-bold\r
              text-slate-900\r
            `,children:e.bestPriceLabel})]}),(0,T.jsxs)(`div`,{className:`text-left md:text-right`,children:[(0,T.jsx)(`p`,{className:`\r
              text-xs\r
              font-medium\r
              uppercase\r
              tracking-wide\r
              text-slate-400\r
            `,children:`Compared`}),(0,T.jsx)(`p`,{className:`\r
              mt-1\r
              text-sm\r
              text-slate-500\r
            `,children:e.comparedAtLabel})]})]})]})}function L({comparisons:e}){let[t,n]=(0,M.useState)(!1),r=t?e:e.slice(0,2);return(0,T.jsxs)(`section`,{children:[(0,T.jsx)(A,{title:`Recent Comparisons`,description:`Latest comparison activity across products.`,actionLabel:e.length>2?t?`Show Less`:`View All`:void 0,onAction:()=>n(e=>!e)}),e.length===0?(0,T.jsx)(`p`,{className:`text-sm text-slate-500`,children:`Recent live comparisons will appear after products are refreshed.`}):(0,T.jsx)(`div`,{children:r.map(e=>(0,T.jsx)(I,{comparison:e},e.id))})]})}var R={Smartphones:d,Laptop:u,Audio:p,Television:m,Wearables:f},z=w;function B({product:e,maxVisibleStores:t=3}){let n=R[e.category]??z,r=e.trend===`down`,i=e.stores.slice(0,t),a=Math.max(e.stores.length-i.length,0);return(0,T.jsxs)(`article`,{className:`\r
        flex flex-col\r
        py-5\r
        border-b border-slate-200\r
        transition-all\r
        gap-6 duration-200 hover:bg-slate-50 first:pt-0 last:border-b-0 last:pb-0\r
        md:flex-row md:items-start md:justify-between\r
      `,children:[(0,T.jsxs)(`div`,{className:`\r
          flex flex-1\r
          min-w-0\r
          gap-4\r
        `,children:[(0,T.jsx)(`div`,{className:`\r
            flex overflow-hidden\r
            h-16 w-16\r
            bg-slate-100\r
            rounded-2xl\r
            shrink-0 items-center justify-center\r
          `,children:e.thumbnail?(0,T.jsx)(`img`,{src:e.thumbnail,alt:e.name,loading:`lazy`,className:`\r
                object-cover\r
                h-full w-full\r
              `}):(0,T.jsx)(n,{size:28,className:`\r
                text-slate-500\r
              `})}),(0,T.jsxs)(`div`,{className:`\r
            flex-1\r
            min-w-0\r
          `,children:[(0,T.jsx)(`h3`,{className:`\r
              text-base font-semibold text-slate-900\r
              truncate\r
            `,children:e.name}),(0,T.jsx)(`p`,{className:`\r
              mt-1\r
              text-sm text-slate-500\r
            `,children:e.category}),(0,T.jsxs)(`div`,{className:`\r
              flex flex-wrap\r
              mt-3\r
              gap-2\r
            `,children:[i.map(e=>(0,T.jsx)(`span`,{className:`\r
                  px-2.5 py-1\r
                  text-xs font-medium text-slate-600\r
                  bg-slate-100\r
                  rounded-full\r
                `,children:e},e)),a>0&&(0,T.jsxs)(`span`,{className:`\r
                  px-2.5 py-1\r
                  text-xs font-semibold text-blue-700\r
                  bg-blue-50\r
                  rounded-full\r
                `,children:[`+`,a]})]}),e.isBestPrice&&(0,T.jsxs)(`div`,{className:`
                inline-flex\r
                mt-3 px-3 py-1\r
                text-xs font-semibold text-emerald-700\r
                bg-emerald-50\r
                rounded-full\r
                items-center gap-2\r
              `,children:[(0,T.jsx)(c,{size:14}),`Best Price`,(0,T.jsxs)(`span`,{className:`\r
                  font-medium\r
                `,children:[`• `,e.bestPriceStoreLabel]})]}),(0,T.jsxs)(`div`,{className:`
              mt-3
              flex
              flex-wrap
              gap-2
            `,children:[(0,T.jsxs)(`span`,{className:`
                inline-flex
                items-center
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${e.qualityColor}
              `,children:[`Quality `,e.qualityLabel,` - `,e.qualityScoreLabel]}),(0,T.jsxs)(`span`,{className:`
                inline-flex
                items-center
                rounded-full
                bg-slate-100
                px-3
                py-1
                text-xs
                font-medium
                text-slate-600
              `,children:[`Avg `,e.averagePriceLabel]})]})]})]}),(0,T.jsxs)(`div`,{className:`\r
          flex flex-col\r
          shrink-0 items-start gap-3\r
          lg:items-end\r
        `,children:[(0,T.jsx)(`p`,{className:`\r
            text-lg font-bold text-slate-900\r
          `,children:e.currentPriceLabel}),(0,T.jsxs)(`span`,{className:`
            inline-flex
            mt-2 px-2.5 py-1
            text-xs font-semibold
            rounded-full
            items-center gap-1
            ${r?`bg-emerald-100 text-emerald-700`:`bg-red-100 text-red-700`}
          `,children:[r?(0,T.jsx)(x,{size:14}):(0,T.jsx)(C,{size:14}),e.priceChangeLabel]}),(0,T.jsx)(`div`,{className:`\r
            mt-4\r
          `,children:(0,T.jsx)(b,{data:e.trendHistory,color:r?`success`:`danger`,width:140})}),(0,T.jsxs)(`button`,{type:`button`,className:`\r
            inline-flex\r
            mt-4\r
            text-sm font-medium text-blue-600\r
            transition-all\r
            items-center gap-2 duration-200 hover:gap-3 hover:text-blue-700\r
          `,children:[`View Details`,(0,T.jsx)(o,{size:16})]})]})]})}function V({products:e}){let[t,n]=(0,M.useState)(!1),r=t?e:e.slice(0,2);return(0,T.jsxs)(`section`,{children:[(0,T.jsx)(A,{title:`Trending Products`,description:`Most active products across connected stores.`,actionLabel:e.length>2?t?`Show Less`:`View All`:void 0,onAction:()=>n(e=>!e)}),e.length===0?(0,T.jsx)(`p`,{className:`text-sm text-slate-500`,children:`No live marketplace products are available yet.`}):(0,T.jsx)(`div`,{children:r.map(e=>(0,T.jsx)(B,{product:e},e.id))})]})}function H({trendingProducts:e,priceAlerts:t,recommendations:n,recentComparisons:r}){return(0,T.jsxs)(`section`,{"aria-label":`Dashboard Workspace`,className:`\r
        grid
        gap-6
        items-stretch
        lg:grid-cols-12
      `,children:[(0,T.jsx)(`div`,{className:`lg:col-span-8`,children:(0,T.jsx)(k,{children:(0,T.jsx)(V,{products:e})})}),(0,T.jsx)(`div`,{className:`lg:col-span-4`,children:(0,T.jsx)(k,{children:(0,T.jsx)(F,{alerts:t})})}),(0,T.jsx)(`div`,{className:`lg:col-span-6`,children:(0,T.jsx)(k,{children:(0,T.jsx)(N,{recommendations:n})})}),(0,T.jsx)(`div`,{className:`lg:col-span-6`,children:(0,T.jsx)(k,{children:(0,T.jsx)(L,{comparisons:r})})})]})}function U(){let e=_(),t=e.metrics.length>0;return(0,T.jsxs)(`section`,{className:`\r
        mx-auto\r
        flex\r
        w-full\r
        max-w-screen-2xl\r
        flex-col\r
        gap-8\r
      `,children:[(0,T.jsx)(E,{refreshing:e.refreshing,lastUpdated:e.lastUpdated,onRefresh:e.refreshDashboard}),e.error&&(0,T.jsx)(`section`,{role:`alert`,className:`
            rounded-3xl
            border
            border-red-200
            bg-red-50
            p-5
            text-sm
            font-medium
            text-red-700
          `,children:e.error}),e.loading?(0,T.jsx)(`section`,{className:`
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
            text-sm
            text-slate-500
          `,children:`Loading live marketplace intelligence...`}):e.error&&!t?null:(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(O,{metrics:e.metrics}),(0,T.jsx)(H,{trendingProducts:e.trendingProducts,priceAlerts:e.priceAlerts,recommendations:e.recommendations,recentComparisons:e.recentComparisons})]})]})}export{U as DashboardPage};