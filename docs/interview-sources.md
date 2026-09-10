# 面试场景与系统设计选题来源

核验日期：2026-09-08。通过搜索与逐页打开核验，本文仅记录选题证据，不搬运完整题干或答案。

## 结论与编辑边界

建议新增「场景实战」「系统设计」两本，各 20 题。前者练局部故障、并发与一致性取舍，后者练需求澄清、容量估算、数据模型与整体方案。下列选题是编辑建议，不是统计意义上的大厂高频排名。

公开面经只是发帖人的自述，不能独立验证其任职、面试事实或代表企业的题库。正文可标注“参考公开面经整理”，不写“某厂必考/官方真题”。所有业务规模、时限、示例与追问应原创设定，并明确是练习假设。原文中的不确定答案不作为标准答案。

## 已打开核验的来源

### GitHub：原作者/维护方的课程与问答

- **G1 — System Design Primer**：[仓库](https://github.com/donnemartin/system-design-primer)。维护方提供自己的练习与方案目录，覆盖短链、Feed、爬虫、查询缓存、销售排行；同页说明需求、设计、细化、扩展的讨论步骤。不是企业官方题库。
- **G2 — Design Pastebin / Bit.ly**：[题目与方案](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/pastebin/README.md)。正文可读，涵盖创建/读取、容量约束、短标识、缓存与存储。可用于短链接练习主题。
- **G3 — Twitter timeline and search**：[题目与方案](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/twitter/README.md)。正文可读，涵盖发布、时间线与搜索。可拆成关注流与内容检索两个不同练习。
- **G4 — Sales ranking**：[题目与方案](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/sales_rank/README.md)。正文可读，题目明确按商品类别计算销售排名。适合榜单与聚合主题。
- **G5 — Key-value store / query cache**：[题目与方案](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/query_cache/README.md)。正文可读，题目围绕搜索查询结果缓存与键值存储。
- **G6 — Karan Pratap Singh: URL Shortener**：[作者课程源文件](https://github.com/karanpratapsingh/portfolio/blob/master/data/courses/system-design/url-shortener.mdx)。原作者个人仓库，页面日期 2022-10-23；覆盖唯一别名、跳转、过期、防滥用与访问分析。
- **G7 — Karan Pratap Singh: WhatsApp**：[作者课程源文件](https://github.com/karanpratapsingh/portfolio/blob/master/data/courses/system-design/whatsapp.mdx)。原作者课程，页面日期 2022-10-24；包含单聊/群聊、附件、送达/已读状态、在线状态、通知与媒体存储讨论。文中的规模是课程假设，不是产品现状。
- **G8 — InterviewReady: 20 system design questions**：[维护方选题文件](https://github.com/InterviewReady/system-design-resources/blob/main/top-20-questions.md)。直接列出座位/车票预订、分析、异常告警、支付、订阅、电商、聊天、打车/外卖、协作文档、文件存储、邮件、点播及直播等主题。题目列表可读；没有把外链付费课内容抓取下来。
- **G9 — Design Gurus: Design TinyURL**：[课程方公开题目](https://github.com/design-gurus/grokking-system-design/blob/main/questions/design-tinyurl.md)。正文公开，可读创建/跳转、可选别名与过期、读多写少等要求。只作为主题交叉核验。
- **G10 — JavaGuide: Redis 常见面试题总结**：[作者面试突击版源文件](https://github.com/Snailclimb/JavaGuide-Interview/blob/master/docs/database/redis.md)。作者将自己 JavaGuide 内容浓缩为问答；已核实击穿、穿透、雪崩、双写一致性、hotkey、bigkey、锁、Session、延迟任务与统计应用的章节。可用作题目主题来源，不照搬其中实现结论。
- **G11 — JavaGuide: 消息队列**：[作者源文件](https://github.com/Snailclimb/JavaGuide/blob/main/docs/high-performance/message-queue/message-queue.md)。已核实可靠性、重复消费、业务幂等、顺序、积压以及消费者/分区限制的主题。
- **G12 — JavaGuide: 定时任务**：[作者源文件](https://github.com/Snailclimb/JavaGuide/blob/main/docs/system-design/schedule-task.md)。已核实定时/延迟任务与未支付订单自动取消场景，可支持订单超时和任务调度选题。
- **G13 — JavaGuide: 超时和重试**：[作者源文件](https://github.com/Snailclimb/JavaGuide/blob/main/docs/high-availability/timeout-and-retry.md)。已核实调用时限、重试风暴、幂等、熔断/限流/隔离与观测主题。所有练习只借用问题类别，不套用文章中的参数建议。

### 牛客：候选人亲述

- **N1 — 快手一面、二面（已挂）**：[原帖](https://www.nowcoder.com/discuss/526459193570639872)。steven_t1k1，2023-08-30；正文明确记录使用数据库与 Redis 完成秒杀流程并继续优化的场景提问。题中用京东活动举例，不等于京东面试题。
- **N2 — 面试复盘｜WXG-微信支付**：[原帖](https://www.nowcoder.com/discuss/353158377981288448)。李爱乐，2021-08-30；正文记录缓存/数据库一致性、Redis 持久化丢失与爬虫项目追问。仅能证明发帖人的个人记录。
- **N3 — 面试复盘｜字节跳动面经-技术中台-一二三凉面**：[原帖](https://www.nowcoder.com/discuss/353158217398165504)。李爱乐，2021-08-16；记录大量数据读取汇总、MySQL 主从复制与新增机器等项目优化追问。
- **N4 — 各厂三年 go 面经，已入字节**：[原帖](https://www.nowcoder.com/discuss/353157951986802688)。正文说明内容为作者一个月面试记录，先汇总再分公司记录；已核实缓存异常、分布式锁、慢 SQL、分库分表平滑扩容、网关限流、消息重试/幂等、火焰图、日志采集及服务迁移话题。个别题只在前部汇总出现，不给它强加具体公司归属。
- **N5 — 4399_Web后端开发_凉经**：[原帖](https://www.nowcoder.com/discuss/732675514812370944)。亲述语气、轮次与反问信息完整；已核实短信限流、消息积压、恶意登录/账号锁定、防护与告警追问。原帖回答不作为安全实践标准。

### LeetCode：原发讨论

- **L1 — 交流｜字节跳动设计题（分布式相关），求大佬指导**：[原帖](https://leetcode.cn/discuss/post/3150824/zi-jie-tiao-dong-she-ji-ti-fen-bu-shi-x9bv/)。yanqic 自述面试，正文有两道题：不同核数下任务调度，以及固定长度、字符集限定、不可猜测、集群唯一的激活码服务。后者适合作为系统设计题；原帖自答含不确定推断，不能照搬。没有把任务调度错误描述成其唯一设计题。
- **L2 — Design a efficient client side rate limit handler**：[原帖](https://leetcode.com/discuss/post/637402/Design-a-efficient-client-side-rate-limit-handler/)。Vaibhav Kumbhar 原发设计问题；正文要求按 HTTP 方法限制速率、同资源事件有序、不同资源并行，以及工作线程共享退避信号。它是社区讨论，不是 LeetCode 官方判题题目。
- **L3 — 求职求助｜如何做好系统设计题**：[原帖](https://leetcode.cn/circle/discuss/qBWZja/)。qiuhuiming，2021-08-28；作者自述面试遇到朋友圈和超大文件两数之和设计。只支持这两个话题出现过的个人记录，不支持“大厂高频”的统计断言。

### 补充工程一手资料（不冒充面试证据）

- **E1 — Java 线程池实现原理及其在美团业务中的实践**：[美团技术团队](https://tech.meituan.com/2020/04/02/java-pooling-pratice-in-meituan.html)。已打开正文，可用于线程池排队/隔离/动态调参的练习背景；这是团队工程分享，不是面经。

## 建议题目映射：场景实战 20 题

以下标题与变体由本站原创组织。来源只为主题依据；具体流量、规模、失败时序、追问均为练习假设。

| # | 原创练习方向 | 主题依据 |
| --- | --- | --- |
| 1 | 热点商品过期，数据库流量突然放大 | G10、N4 |
| 2 | 不存在的商品 ID 持续打穿缓存 | G10、N4 |
| 3 | 大批缓存同时失效后的止损与恢复 | G10、N4 |
| 4 | 更新成功但读到旧数据：缓存一致性 | G10、N2 |
| 5 | 单个热点 Key 压满实例 | G10 |
| 6 | 大 Key 导致其他业务访问变慢 | G10 |
| 7 | 消息重复到达，避免重复业务变更 | G11、N4 |
| 8 | 业务落库成功，却没有下游事件 | G11 |
| 9 | 订单状态事件乱序 | G11、L2 |
| 10 | 消费积压持续上升，扩实例仍无效 | G11、N5 |
| 11 | RPC 超时后能否安全重试 | G13、N4 |
| 12 | 下游故障引发重试风暴 | G13、L2 |
| 13 | 多用户同时争抢最后一份库存 | N1 |
| 14 | 关单任务与支付回调同时发生 | G12、G10（超时主题，竞态为原创变体） |
| 15 | 锁租约到期但旧任务还未结束 | N4、G10（锁主题，时序为原创变体） |
| 16 | 数据增长后查询变慢 | N4、N3 |
| 17 | 不停服迁移分片，如何验证与回退 | N4 |
| 18 | 线程池排队上涨，如何定位及隔离 | E1、G13 |
| 19 | 实例 CPU 异常升高，怎样形成证据链 | N4（火焰图主题，故障为原创练习） |
| 20 | 短信/登录接口被滥用，兼顾正常用户 | N5、L2 |

## 建议题目映射：系统设计 20 题

| # | 原创练习方向 | 主题依据 |
| --- | --- | --- |
| 1 | 短链接服务 | G2、G6、G9 |
| 2 | 集群激活码发放与兑换 | L1 |
| 3 | 多租户 API 限流服务 | L2、N4、G13 |
| 4 | 秒杀活动与异步下单 | N1 |
| 5 | 座位预订服务 | G8 |
| 6 | 电商订单系统 | G8 |
| 7 | 支付接入与异步回调 | G8、G13 |
| 8 | 订阅与权益管理 | G8 |
| 9 | 关注动态流 | G3、L3 |
| 10 | 即时聊天服务 | G7、G8 |
| 11 | 统一通知服务 | G7（通知子系统，扩展为独立练习） |
| 12 | 文件上传、存储与分享 | G8、G7 |
| 13 | 视频点播服务 | G8 |
| 14 | 附近司机与派单 | G8 |
| 15 | 日/周销售排行榜 | G4 |
| 16 | 内容搜索服务 | G3 |
| 17 | 分布式键值缓存 | G5 |
| 18 | 任务调度与失败恢复 | G12、L1（调度主题的原创扩展） |
| 19 | 埋点统计与异常告警 | G8 |
| 20 | 协作文档与冲突处理 | G8 |

## 访问限制与未采用材料

- 牛客部分 URL 带 `sourceSSR` 时首次返回 cache miss，去参数后可读（例如 N4）；旧短 ID 会重定向到新长 ID，记录以新地址为主。
- 携程面经 `https://www.nowcoder.com/discuss/397421042183024640` 搜索结果含 MQ 积压和慢 SQL，但两次打开失败，不用作已核验核心来源。
- LeetCode `System Design: Rate Limiter`（1616482）搜索能读摘要，打开失败；用 L2 替代，未假称抓取成功。
- 牛客“腾讯音乐面经（速通 OC 版）”实际为多帖汇总，不作为亲述来源；其中外链 `733320041113956352` 当前打开标题已变为内推帖，不用于 CPU/GC 真题归属。CPU 练习只作为 N4 火焰图话题的原创扩展。
- `doocs/advanced-java` 确有相关问题目录，但 README 明确大部分内容来自中华石杉，属于编纂材料；本次不将其认定为原作者一手面经或工程说明。
- 未访问付费课程内部内容；未复制任何来源的完整题干、答案、图片、公司标识。公开可访问不等同于允许全文再发布。

## 编辑建议

每题保持“背景 → 明确约束 → 需要回答的问题 → 追问 → 来源链接”，示例用于描述业务时序，不伪装成有唯一正确输出的算法样例。难度是本站对讨论广度/深度的编排，不是来源平台的官方难度。

本轮记录用于选题与可溯源性，不是对所有原文技术结论的事实审核。若以后新增参考答案，应另查对应技术的官方文档、协议或原论文。

## 后续补充

2026-09-10 基于用户指定的 ByteByteGo Guides 与 liquidslr/system-design-notes 追加系统设计 40 题，保留本文件对应的原有 20 题。新增题均为纯问题与空白草稿，来源、主题去重和技术边界见[系统设计补全来源](system-design-expansion-sources.md)。本文件的原始题量及建议属于 2026-09-08 的历史记录。
