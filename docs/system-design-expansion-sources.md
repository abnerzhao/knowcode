# 系统设计补全：ByteByteGo 与 liquidslr 选题来源

核对日期：2026-09-10。来源为用户指定的 [liquidslr/system-design-notes](https://github.com/liquidslr/system-design-notes)。本文件只记录选题主题、精确链接与编辑边界，不复制书籍正文、解答或插图。

## 来源性质与核对方法

[仓库 Readme](https://github.com/liquidslr/system-design-notes/blob/main/Readme.md) 说明这些是基于 Alex Xu《System Design Interview》第一、二卷的学习笔记，且仍在完善。它可作为用户指定的选题来源，**不能标注为企业官方面经，也没有提供足以支持“出现频率排名”的证据**。

通过 GitHub 公开 API 核对完整目录，并对 28 个章节的 raw Markdown 分别取得 HTTP 200。第 1–16 章文件名是 `Readme.md`，第 17–28 章是 `README.md`；第 27 章目录名中点号后有两个空格。目录核对时 main tree 为 `9d8388721e7231442763ad37398b8d82224aa68f`。主题提取依据各章标题及相关内容；链接使用 main，后续内容可能变化。

## 章节与题库映射

下表“新增/加强”是本项目编辑建议，并非来源给出的考试权重。已有题目名称以本项目当前数据为准；保留原题 ID、slug 与草稿键。

| 章 | 精确来源 | 内容主题 | 编辑建议 |
| --- | --- | --- | --- |
| 1 | [Scaling](https://github.com/liquidslr/system-design-notes/blob/main/01.%20Scaling/Readme.md) | 单机到多实例、数据库拆分、读副本、负载均衡、CDN、无状态、跨机房、分片 | 新增渐进扩容、无状态会话、读写分离、分片迁移等基础设计题 |
| 2 | [Estimation](https://github.com/liquidslr/system-design-notes/blob/main/02.%20Back%20Of%20the%20Envelope%20Estimation/Readme.md) | QPS、存储、延迟数量级、可用性、估算假设和单位 | 新增容量估算题；自拟参数，不复用书中的企业规模数字 |
| 3 | [Framework](https://github.com/liquidslr/system-design-notes/blob/main/03.%20System%20Design%20Framework/Readme.md) | 澄清范围、高层设计、重点深入、收尾与权衡 | 新增需求澄清、接口/数据模型和故障边界题 |
| 4 | [Rate Limiter](https://github.com/liquidslr/system-design-notes/blob/main/04.%20Rate%20Limiter/Readme.md) | 令牌桶、漏桶、窗口、多实例协调、监控 | 加强已有 API 限流题，不另建同义题 |
| 5 | [Consistent Hashing](https://github.com/liquidslr/system-design-notes/blob/main/05.%20Consistent%20Hashing/Readme.md) | 节点增减、迁移范围、虚拟节点、负载分布 | 新增一致性哈希路由与扩缩容题；不要声称虚拟节点能消除热键 |
| 6 | [Key-Value Store](https://github.com/liquidslr/system-design-notes/blob/main/06.%20Key-Value%20Store/Readme.md) | 分区、副本、quorum、版本冲突、Gossip、hinted handoff、Merkle tree、日志和 SSTable | 新增持久化分布式 KV；与已有缓存题区分持久化、恢复和一致性契约 |
| 7 | [Unique ID](https://github.com/liquidslr/system-design-notes/blob/main/07.%20Unique-Id%20Generator/Readme.md) | UUID、票号服务、Snowflake、时钟及位数权衡 | 新增全局 ID：唯一性、趋势有序、节点标识与时钟回拨追问；不等同随机激活码 |
| 8 | [URL Shortener](https://github.com/liquidslr/system-design-notes/blob/main/08.%20URL%20Shortener/Readme.md) | 编码、碰撞、重定向、缓存、统计 | 为已有短链题补精确来源与追问 |
| 9 | [Web Crawler](https://github.com/liquidslr/system-design-notes/blob/main/09.%20Web%20Crawler/Readme.md) | URL frontier、按站点限速、去重、优先级、robots、重抓取、陷阱 URL | 新增公开网页爬虫设计；明确仅抓取允许访问的内容 |
| 10 | [Notification](https://github.com/liquidslr/system-design-notes/blob/main/10.%20Notification%20System/Readme.md) | 多渠道、队列、偏好、去重、重试、供应商 | 加强已有通知题，不把发送成功等同用户收到 |
| 11 | [News Feed](https://github.com/liquidslr/system-design-notes/blob/main/11.%20News%20Feed%20System/Readme.md) | 发布/读取链路、扇出、名人用户、缓存层 | 加强已有时间线题 |
| 12 | [Chat](https://github.com/liquidslr/system-design-notes/blob/main/12.%20Chat%20System/Readme.md) | 单聊群聊、连接发现、消息同步、在线状态 | 加强已有聊天题 |
| 13 | [Autocomplete](https://github.com/liquidslr/system-design-notes/blob/main/13.%20Search%20Autocomplete/Readme.md) | 前缀 Top-K、Trie、离线聚合、增量热词、分片、多语言、过滤 | 新增搜索联想，区别于已有全文搜索题 |
| 14 | [YouTube](https://github.com/liquidslr/system-design-notes/blob/main/14.%20Youtube/Readme.md) | 上传、转码 DAG、分发、成本与失败处理 | 加强已有点播题；不搬运过时的平台规模数据 |
| 15 | [Google Drive](https://github.com/liquidslr/system-design-notes/blob/main/15.%20Google%20Drive/Readme.md) | 元数据、块同步、冲突、通知、去重与失败 | 加强文件同步/分享题，区别于底层对象存储服务 |
| 16 | [Proximity](https://github.com/liquidslr/system-design-notes/blob/main/16.%20Proximity%20Service/Readme.md) | 静态商家位置、Geohash、网格、四叉树、索引与缓存更新 | 新增附近商家搜索，与司机实时匹配区分；关注相邻网格边界与稠密热点 |
| 17 | [Nearby Friends](https://github.com/liquidslr/system-design-notes/blob/main/17.%20Nearby%20Friends/README.md) | 持续位置更新、WebSocket、订阅广播、TTL、关系变更 | 新增实时好友位置分享；区别于静态 POI 和派单，纳入授权撤回与位置过期 |
| 18 | [Google Maps](https://github.com/liquidslr/system-design-notes/blob/main/18.%20Google%20Maps/README.md) | 地图瓦片、道路图、位置上报、路线、ETA、重规划 | 新增地图导航题，不要求复刻某家实际架构 |
| 19 | [Distributed MQ](https://github.com/liquidslr/system-design-notes/blob/main/19.%20Distributed%20Message%20Queue/README.md) | 分区日志、消费组、批量、位点、重平衡、副本与投递语义 | 新增从零设计消息队列，区别于单一 Kafka 配置知识；不沿用过时组件为必需品 |
| 20 | [Metrics & Alerting](https://github.com/liquidslr/system-design-notes/blob/main/20.%20Metrics%20Monitoring%20and%20Alerting%20System/README.md) | 指标模型、采集、聚合、传输、时序存储、查询与告警 | 可独立新增指标监控平台，与现有业务埋点采集区分高基数、降采样及告警状态 |
| 21 | [Ad Click Aggregation](https://github.com/liquidslr/system-design-notes/blob/main/21.%20Ad%20Click%20Event%20Aggregation/README.md) | 流批、事件时间、窗口、迟到、去重、重算、正确性 | 新增广告点击聚合与补算题，区别于简单榜单计数 |
| 22 | [Hotel Reservation](https://github.com/liquidslr/system-design-notes/blob/main/22.%20Hotel%20Reservation%20System/README.md) | 房型/日期库存、多晚预订、并发约束、分布式服务一致性 | 新增跨日期库存预订；明确与单场次座位锁定的差异，避免只换业务名字 |
| 23 | [Distributed Email](https://github.com/liquidslr/system-design-notes/blob/main/23.%20Distributed%20Email%20Service/README.md) | 收发、SMTP/IMAP/POP、邮件元数据、搜索、反滥用、投递能力 | 新增完整邮箱服务，区别于已有发送通知；不把“SMTP 接受”当成“进入收件箱” |
| 24 | [Object Storage](https://github.com/liquidslr/system-design-notes/blob/main/24.%20S3-like%20Object%20Storage/README.md) | 元数据/数据分离、对象放置、副本/纠删码、校验、版本、分片上传、回收 | 新增底层对象存储，区别于应用层网盘分享；持久性数字必须有明确模型 |
| 25 | [Gaming Leaderboard](https://github.com/liquidslr/system-design-notes/blob/main/25.%20Real-time%20Gaming%20Leaderboard/README.md) | Top-K、本人附近排名、Redis 扩展与替代方案 | 加强已有销售榜题的“本人排名/邻近排名”，不另造同义榜单 |
| 26 | [Payment](https://github.com/liquidslr/system-design-notes/blob/main/26.%20Payment%20System/README.md) | 支付/出款、PSP、复式账本、对账、延迟、失败、幂等 | 加强已有支付题的状态未知与对账，不宣称网络能无条件 exactly-once |
| 27 | [Digital Wallet](https://github.com/liquidslr/system-design-notes/blob/main/27.%20%20Digital%20Wallet/README.md) | 账户转账、跨分片事务、TCC/Saga、事件溯源、确定性重放 | 新增钱包/账本设计，明确是账户内部资金守恒，不重复第三方支付网关 |
| 28 | [Stock Exchange](https://github.com/liquidslr/system-design-notes/blob/main/28.%20Stock%20Exchange/README.md) | 订单簿、撮合、定序、行情、重放、故障恢复、尾延迟 | 新增简化交易撮合，限定练习场景，不把教程当真实交易所实现 |

## 建议分类

可新增“设计基础”“分布式组件”“搜索与地理”“存储与通信”“交易与流处理”分类，或遵循现有题库分类，把以上主题按对应语义归入。优先覆盖新增目标而不是每章机械新建一题。系统设计练习适合题干、独立练习假设、示例输入/事件与追问；书中解答无需导入。

## 不应继承的简化结论

- 第 6 章的 CAP、quorum 与故障描述有教学简化。题干不要预设“任意时候三选二”“R+W>N 就无条件强一致”或“一个节点失联即全局禁写”；应要求说明网络分区、并发写、版本和故障假设。
- 第 19 章以 ZooKeeper 为协调方案示例；不能据此写出现代 Kafka 必须依赖 ZooKeeper。
- 第 21 章对 watermark 的介绍较简化；提问可以分别考事件时间进度、允许迟到、窗口关闭与补算，不把它们混为一个配置项。
- 第 24 章的纠删码与持久性比较、ETag 与 MD5 表述不能直接推广为所有对象存储的承诺；题目只问权衡、校验与失败模型。
- 第 28 章将 ring buffer 泛称 lock-free 的措辞不能作为普遍结论；题目应问具体并发模型。
- 上述章节中举例的 QPS、延迟、用户量和恢复目标只是练习假设或历史数据，不标记为当前公司实际指标。设计题的约束需明确由本项目自拟。
- 内容按主题原创整理并附章节链接；不复制章节正文、完整解法或原图。来源只为学习导航，不是实现正确性的唯一保证。

## ByteByteGo Guides 核对

核验日期同为 2026-09-10。读取用户指定的 [Guides 目录](https://bytebytego.com/guides/)，再按 API、数据库、缓存、架构、云与分布式系统、技术面试分类筛选。使用 defuddle 提取公开正文，正文含导航时只依据实际文章段落取题；未登录、未读取付费课程、未下载或复刻图解。下表每个具体指南均已读取，链接仅供学习导航。

| 来源键 | 精确指南 |
| --- | --- |
| bb-interview | [ByteByteGo · how to ace system design interviews like a boss](https://bytebytego.com/guides/how-to-ace-system-design-interviews-like-a-boss/) |
| bb-latency | [ByteByteGo · which latency numbers should you know](https://bytebytego.com/guides/which-latency-numbers-should-you-know/) |
| bb-scale | [ByteByteGo · how to scale a website to support millions of users](https://bytebytego.com/guides/how-to-scale-a-website-to-support-millions-of-users/) |
| bb-micro | [ByteByteGo · is microservice architecture the silver bullet](https://bytebytego.com/guides/is-microservice-architecture-the-silver-bullet/) |
| bb-gateway | [ByteByteGo · what are the differences between a load balancer and an api gateway](https://bytebytego.com/guides/what-are-the-differences-between-a-load-balancer-and-an-api-gateway/) |
| bb-push | [ByteByteGo · shortlong polling sse websocket](https://bytebytego.com/guides/shortlong-polling-sse-websocket/) |
| bb-page | [ByteByteGo · how do we perform pagination in api design](https://bytebytego.com/guides/how-do-we-perform-pagination-in-api-design/) |
| bb-cdn | [ByteByteGo · what is cdn content delivery network](https://bytebytego.com/guides/what-is-cdn-content-delivery-network/) |
| bb-db | [ByteByteGo · how to choose the right database](https://bytebytego.com/guides/how-to-choose-the-right-database/) |
| bb-replica | [ByteByteGo · how to implement read replica pattern](https://bytebytego.com/guides/how-to-implement-read-replica-pattern/) |
| bb-shard | [ByteByteGo · key concepts to understand database sharding](https://bytebytego.com/guides/key-concepts-to-understand-database-sharding/) |
| bb-tree | [ByteByteGo · b tree vs](https://bytebytego.com/guides/b-tree-vs/) |
| bb-cache | [ByteByteGo · what are the top caching strategies](https://bytebytego.com/guides/what-are-the-top-caching-strategies/) |
| bb-cap | [ByteByteGo · cap theorem one of the most misunderstood terms](https://bytebytego.com/guides/cap-theorem-one-of-the-most-misunderstood-terms/) |
| bb-delivery | [ByteByteGo · delivery semantics](https://bytebytego.com/guides/delivery-semantics/) |
| bb-saga | [ByteByteGo · top eventual consistency patterns you must know](https://bytebytego.com/guides/top-eventual-consistency-patterns-you-must-know/) |
| bb-event | [ByteByteGo · differences in event sourcing system design](https://bytebytego.com/guides/differences-in-event-sourcing-system-design/) |
| bb-cdc | [ByteByteGo · change data capture key to leverage real time data](https://bytebytego.com/guides/change-data-capture-key-to-leverage-real-time-data/) |
| bb-hash | [ByteByteGo · consistent hashing](https://bytebytego.com/guides/consistent-hashing/) |
| bb-id | [ByteByteGo · explaining 5 unique id generators in distributed systems](https://bytebytego.com/guides/explaining-5-unique-id-generators-in-distributed-systems/) |
| bb-failure | [ByteByteGo · how do we detect node failures in distributed systems](https://bytebytego.com/guides/how-do-we-detect-node-failures-in-distributed-systems/) |
| bb-lock | [ByteByteGo · why do we need to use a distributed lock](https://bytebytego.com/guides/why-do-we-need-to-use-a-distributed-lock/) |
| bb-dr | [ByteByteGo · cloud disaster recovery strategies](https://bytebytego.com/guides/cloud-disaster-recovery-strategies/) |
| bb-api | [ByteByteGo · API 架构风格比较](https://bytebytego.com/guides/a-cheatsheet-on-comparing-api-architectural-styles/) |

### ByteByteGo 内容的使用边界

- 指南用作主题地图，不能把图解中的简化表达直接升级为通用技术承诺。延迟数字不是端到端服务指标；硬件一次访问不能等同于一次 Redis、数据库或跨服务请求。
- 渐进扩展不是固定的“加组件”顺序；扩机器规格与按列拆分是不同概念，增加读副本也不自动增加主库写入能力。
- 不预设“微服务必然无状态”“某类业务绝不能拆服务”等绝对结论。考察业务边界、状态管理、调用开销及故障成本。
- CAP 与正常运行下的延迟取舍分开讨论；quorum 相交还需并发写、版本、成员变化等前提，不能单独当作线性一致性证明。
- 消息恰好一次需声明事务或处理边界；外部副作用需要独立的幂等与核对协议，不能把中间件的语义扩展到任意第三方接口。
- 缓存 Write Back、CDC、事件溯源、分布式锁分别有故障及副作用边界；同步流程并不会自动处理所有下游冲突，租约过期也不保证旧执行者已经停止。
- UUID 应按具体版本及生成条件比较，不统一描述为“无序”；容灾方案没有与名字绑定的固定 RTO/RPO，须通过恢复演练核验。
- API 指南有些细节只在配图中，本站不复制配图，也不声称导入了完整架构方案。题目是基于可核验主题独立设计的开放问句，不附标准答案。

## 最终题册编排

系统设计由 20 题补至 60 题。旧题 ID、slug、题干与草稿模板完全不变；新增 D21–D60 使用独立的 `sd-` slug，分 8 组，每组 5 题，全部为纯问题与空白草稿。原题已有短链、限流、时间线、聊天、通知、点播、销售榜和支付接入，因此不机械按每个来源章节再建一题。

重叠主题按职责区分：持久化 KV 不等于缓存；邮箱服务不等于发送通知；对象存储内部实现不等于应用上传接口；文件多端同步不等于文件上传分享；静态商家、好友位置订阅、地图导航不等于司机派单；多晚酒店库存不等于固定座位；钱包内部账本不等于第三方支付接入。来源中的游戏榜主题已经由现有销售榜覆盖，不另建同义榜单。

新增题目中的故障、边界和业务比较为本站原创提问。只以两份用户指定材料作主题依据，不宣称企业真题、完整覆盖所有分支主题或高频排名。

| 编号 | 新增主题 | 精确来源 |
| --- | --- | --- |
| D21 | 系统设计的需求澄清与边界 | [ByteByteGo · how to ace system design interviews like a boss](https://bytebytego.com/guides/how-to-ace-system-design-interviews-like-a-boss/)；[liquidslr 读书笔记 · 第 3 章](https://github.com/liquidslr/system-design-notes/blob/main/03.%20System%20Design%20Framework/Readme.md) |
| D22 | 容量估算与峰值流量 | [liquidslr 读书笔记 · 第 2 章](https://github.com/liquidslr/system-design-notes/blob/main/02.%20Back%20Of%20the%20Envelope%20Estimation/Readme.md)；[ByteByteGo · how to ace system design interviews like a boss](https://bytebytego.com/guides/how-to-ace-system-design-interviews-like-a-boss/) |
| D23 | 端到端延迟预算与尾延迟 | [ByteByteGo · which latency numbers should you know](https://bytebytego.com/guides/which-latency-numbers-should-you-know/) |
| D24 | 从单机到多实例的渐进扩展 | [ByteByteGo · how to scale a website to support millions of users](https://bytebytego.com/guides/how-to-scale-a-website-to-support-millions-of-users/)；[liquidslr 读书笔记 · 第 1 章](https://github.com/liquidslr/system-design-notes/blob/main/01.%20Scaling/Readme.md) |
| D25 | 模块化单体与微服务边界 | [ByteByteGo · is microservice architecture the silver bullet](https://bytebytego.com/guides/is-microservice-architecture-the-silver-bullet/) |
| D26 | 负载均衡、反向代理与网关 | [ByteByteGo · what are the differences between a load balancer and an api gateway](https://bytebytego.com/guides/what-are-the-differences-between-a-load-balancer-and-an-api-gateway/) |
| D27 | REST、gRPC 与 GraphQL 选型 | [ByteByteGo · API 架构风格比较](https://bytebytego.com/guides/a-cheatsheet-on-comparing-api-architectural-styles/) |
| D28 | 轮询、SSE 与 WebSocket | [ByteByteGo · shortlong polling sse websocket](https://bytebytego.com/guides/shortlong-polling-sse-websocket/) |
| D29 | 大数据列表的游标分页 | [ByteByteGo · how do we perform pagination in api design](https://bytebytego.com/guides/how-do-we-perform-pagination-in-api-design/) |
| D30 | CDN 缓存键、回源与撤销 | [ByteByteGo · what is cdn content delivery network](https://bytebytego.com/guides/what-is-cdn-content-delivery-network/) |
| D31 | 按访问模式选择存储 | [ByteByteGo · how to choose the right database](https://bytebytego.com/guides/how-to-choose-the-right-database/) |
| D32 | 读写分离与读己之写 | [ByteByteGo · how to implement read replica pattern](https://bytebytego.com/guides/how-to-implement-read-replica-pattern/)；[liquidslr 读书笔记 · 第 1 章](https://github.com/liquidslr/system-design-notes/blob/main/01.%20Scaling/Readme.md) |
| D33 | 分片键、热点与在线迁移 | [ByteByteGo · key concepts to understand database sharding](https://bytebytego.com/guides/key-concepts-to-understand-database-sharding/) |
| D34 | B-Tree、LSM 与存储引擎取舍 | [ByteByteGo · b tree vs](https://bytebytego.com/guides/b-tree-vs/) |
| D35 | 缓存读写策略与数据责任 | [ByteByteGo · what are the top caching strategies](https://bytebytego.com/guides/what-are-the-top-caching-strategies/) |
| D36 | CAP、线性一致性与可用性 | [ByteByteGo · cap theorem one of the most misunderstood terms](https://bytebytego.com/guides/cap-theorem-one-of-the-most-misunderstood-terms/) |
| D37 | 消息交付与业务恰好一次 | [ByteByteGo · delivery semantics](https://bytebytego.com/guides/delivery-semantics/) |
| D38 | 跨服务事务与 Saga 补偿 | [ByteByteGo · top eventual consistency patterns you must know](https://bytebytego.com/guides/top-eventual-consistency-patterns-you-must-know/) |
| D39 | CQRS、事件溯源与投影重建 | [ByteByteGo · differences in event sourcing system design](https://bytebytego.com/guides/differences-in-event-sourcing-system-design/) |
| D40 | CDC 的快照、增量与恢复 | [ByteByteGo · change data capture key to leverage real time data](https://bytebytego.com/guides/change-data-capture-key-to-leverage-real-time-data/) |
| D41 | 一致性哈希与虚拟节点 | [ByteByteGo · consistent hashing](https://bytebytego.com/guides/consistent-hashing/)；[liquidslr 读书笔记 · 第 5 章](https://github.com/liquidslr/system-design-notes/blob/main/05.%20Consistent%20Hashing/Readme.md) |
| D42 | 分布式唯一 ID 与时钟回拨 | [ByteByteGo · explaining 5 unique id generators in distributed systems](https://bytebytego.com/guides/explaining-5-unique-id-generators-in-distributed-systems/)；[liquidslr 读书笔记 · 第 7 章](https://github.com/liquidslr/system-design-notes/blob/main/07.%20Unique-Id%20Generator/Readme.md) |
| D43 | 故障检测、心跳与误判 | [ByteByteGo · how do we detect node failures in distributed systems](https://bytebytego.com/guides/how-do-we-detect-node-failures-in-distributed-systems/) |
| D44 | 租约、主节点与过期执行者 | [ByteByteGo · why do we need to use a distributed lock](https://bytebytego.com/guides/why-do-we-need-to-use-a-distributed-lock/) |
| D45 | 跨地域容灾与切回验证 | [ByteByteGo · cloud disaster recovery strategies](https://bytebytego.com/guides/cloud-disaster-recovery-strategies/) |
| D46 | 设计持久化分布式键值库 | [liquidslr 读书笔记 · 第 6 章](https://github.com/liquidslr/system-design-notes/blob/main/06.%20Key-Value%20Store/Readme.md)；[ByteByteGo · cap theorem one of the most misunderstood terms](https://bytebytego.com/guides/cap-theorem-one-of-the-most-misunderstood-terms/) |
| D47 | 设计可重放的分布式消息队列 | [liquidslr 读书笔记 · 第 19 章](https://github.com/liquidslr/system-design-notes/blob/main/19.%20Distributed%20Message%20Queue/README.md)；[ByteByteGo · delivery semantics](https://bytebytego.com/guides/delivery-semantics/) |
| D48 | 设计对象存储的内部服务 | [liquidslr 读书笔记 · 第 24 章](https://github.com/liquidslr/system-design-notes/blob/main/24.%20S3-like%20Object%20Storage/README.md) |
| D49 | 设计时序指标监控平台 | [liquidslr 读书笔记 · 第 20 章](https://github.com/liquidslr/system-design-notes/blob/main/20.%20Metrics%20Monitoring%20and%20Alerting%20System/README.md)；[ByteByteGo · change data capture key to leverage real time data](https://bytebytego.com/guides/change-data-capture-key-to-leverage-real-time-data/) |
| D50 | 设计分布式网页爬虫 | [liquidslr 读书笔记 · 第 9 章](https://github.com/liquidslr/system-design-notes/blob/main/09.%20Web%20Crawler/Readme.md) |
| D51 | 设计搜索联想服务 | [liquidslr 读书笔记 · 第 13 章](https://github.com/liquidslr/system-design-notes/blob/main/13.%20Search%20Autocomplete/Readme.md) |
| D52 | 设计附近商家查询 | [liquidslr 读书笔记 · 第 16 章](https://github.com/liquidslr/system-design-notes/blob/main/16.%20Proximity%20Service/Readme.md) |
| D53 | 设计附近好友的位置共享 | [liquidslr 读书笔记 · 第 17 章](https://github.com/liquidslr/system-design-notes/blob/main/17.%20Nearby%20Friends/README.md) |
| D54 | 设计地图导航与路径服务 | [liquidslr 读书笔记 · 第 18 章](https://github.com/liquidslr/system-design-notes/blob/main/18.%20Google%20Maps/README.md) |
| D55 | 设计酒店多日库存预订 | [liquidslr 读书笔记 · 第 22 章](https://github.com/liquidslr/system-design-notes/blob/main/22.%20Hotel%20Reservation%20System/README.md) |
| D56 | 设计广告点击聚合与结算数据 | [liquidslr 读书笔记 · 第 21 章](https://github.com/liquidslr/system-design-notes/blob/main/21.%20Ad%20Click%20Event%20Aggregation/README.md)；[ByteByteGo · delivery semantics](https://bytebytego.com/guides/delivery-semantics/) |
| D57 | 设计多设备文件同步服务 | [liquidslr 读书笔记 · 第 15 章](https://github.com/liquidslr/system-design-notes/blob/main/15.%20Google%20Drive/Readme.md) |
| D58 | 设计邮件投递与邮箱服务 | [liquidslr 读书笔记 · 第 23 章](https://github.com/liquidslr/system-design-notes/blob/main/23.%20Distributed%20Email%20Service/README.md) |
| D59 | 设计数字钱包与内部转账账本 | [liquidslr 读书笔记 · 第 27 章](https://github.com/liquidslr/system-design-notes/blob/main/27.%20%20Digital%20Wallet/README.md)；[liquidslr 读书笔记 · 第 26 章](https://github.com/liquidslr/system-design-notes/blob/main/26.%20Payment%20System/README.md) |
| D60 | 设计低延迟交易撮合系统 | [liquidslr 读书笔记 · 第 28 章](https://github.com/liquidslr/system-design-notes/blob/main/28.%20Stock%20Exchange/README.md)；[ByteByteGo · which latency numbers should you know](https://bytebytego.com/guides/which-latency-numbers-should-you-know/) |
