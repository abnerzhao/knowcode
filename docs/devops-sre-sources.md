# DevOps / SRE 习题册选题来源

核验日期：2026-09-08。已实际搜索并逐页打开下列官方文档；记录主题依据，不复制原文题干、答案或图片。

## 编辑边界

将 DevOps 与 SRE 放入一本习题册，覆盖场景排障、系统设计、知识考点。下表证明这些是公开工程主题，不证明任何公司考过，也不是“大厂高频题”的统计排名。所有面试提问、故障时间线、业务规模、目标与追问均为本站原创练习假设；难度由本站编排。

初版为 12 道场景、10 道设计、14 道知识，共 36 道。2026-09-09 追加 25 道纯问题格式的 SRE 日常工作题，总计 61 道；原有题目保持不变。基础概念以工程判断题呈现；排障要求证据、止损与验证；设计要求边界、容量、故障模式和取舍。补充来源与范围见文末。

## 已打开核验的来源

所有页面均无需登录即可读取正文。下表“限制”说明版本或证据范围，不表示需要绕过访问控制。

| ID | 主题 | 官方页面 | 证据简述 | 限制 / 注意事项 |
| --- | --- | --- | --- | --- |
| S1 | SLI、SLO、错误预算 | [Google SRE — Implementing SLOs](https://sre.google/workbook/implementing-slos/) | 讨论好事件占比、用户体验、目标窗口及基于错误预算的优先级决策。 | 是可靠性实践，不是面试题库；示例比例不可当成所有服务通用目标。 |
| S2 | 事故响应、值班协作 | [Google SRE — Incident Response](https://sre.google/workbook/incident-response/) | 包含事故指挥、沟通与操作角色，以及先缓解影响的响应原则。 | 工程案例用于抽象工作方式，不能包装成某厂面试原题。 |
| S3 | 无责复盘、改进闭环 | [Google SRE — Postmortem Culture](https://sre.google/sre-book/postmortem-culture/) | 强调分析促成事故的系统因素，并通过改进系统与流程减少复发。 | 无责不等于不分析行动或不追踪改进项。 |
| S4 | Toil 与自动化收益 | [Google SRE — Eliminating Toil](https://sre.google/sre-book/eliminating-toil/) | 解释重复、手工、可自动化、缺少持续价值、随规模线性增长的运维劳动。 | 不等同于一切不喜欢的工作或所有行政工作。 |
| K1 | Pod 排障、调度 | [Kubernetes — Debug Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/) | 展示检查 Pod 状态、事件和日志，以及 Pending、镜像及容器问题的调查入口。 | 不应只凭一个状态认定根因；仍需检查具体事件与生命周期阶段。 |
| K2 | requests / limits、OOM、CPU 限流 | [Kubernetes — Resource Management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) | 区分资源请求和上限，说明 Linux 上 CPU throttling 与内存 OOM 的不同执行行为。 | Linux 与 Windows 实现有差异；只标 OOMKilled 不能直接证明内存泄漏。 |
| K3 | startup / readiness / liveness | [Kubernetes — Pod Probes](https://kubernetes.io/docs/concepts/workloads/pods/probes/) | 就绪探针影响接流量，存活探针可触发重启；错误探针可能导致级联故障。 | 旧地址 `/concepts/configuration/liveness-readiness-startup-probes/` 已重定向；使用新地址。 |
| K4 | HPA、扩缩容抖动 | [Kubernetes — Horizontal Pod Autoscaling](https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/) | 描述指标驱动的副本计算、行为策略和稳定窗口。 | 旧 `/tasks/run-application/horizontal-pod-autoscale/` 已重定向；HPA 不等于节点自动扩容。 |
| K5 | DNS、CoreDNS、服务发现排障 | [Kubernetes — Debugging DNS Resolution](https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/) | 依次检查客户端解析、DNS Pod 日志、Service 与 EndpointSlice、查询是否到达 CoreDNS。 | 官方示例配置有版本差异；题目不要求照搬生产配置。 |
| L1 | Linux CPU / 内存 / IO 压力 | [Linux Kernel — PSI](https://docs.kernel.org/accounting/psi.html) | `/proc/pressure/` 提供 CPU、memory、IO 的任务停顿信号，区分部分与整体停顿。 | 内核版本和系统级 / cgroup 语义要区分；不能用单个 PSI 值替代完整排障。 |
| N1 | TLS、SNI、证书链 | [OpenSSL — openssl-s_client](https://docs.openssl.org/master/man1/openssl-s_client/) | 文档列出 SNI、证书链、主机名验证与验证错误选项，可支持分层 TLS 排障。 | `master` 是动态文档；测试工具默认可在证书错误后继续，连接成功不等于验证通过。 |
| C1 | CI/CD 权限、第三方 Action、供应链 | [GitHub Actions — Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) | 覆盖最小权限、不可信 PR、脚本注入、固定完整提交 SHA、Runner 及 SBOM。 | 它是安全实践，不是完整供应链安全标准；不同 Runner 信任边界需单独建模。 |
| C2 | OIDC 与短期部署凭据 | [GitHub Actions — OpenID Connect](https://docs.github.com/en/actions/concepts/security/openid-connect) | 说明工作流身份、云侧信任规则和短期令牌交换，减少长期云密钥。 | 文档提示 2026-07-15 后新仓库默认 `sub` 格式变化；不要把旧示例固定成唯一格式。 |
| G1 | GitOps 原则、声明式与持续调谐 | [OpenGitOps — Principles](https://opengitops.dev/) | 公开列出声明式、版本化且不可变、自动拉取、持续调谐四项原则。 | 项目规范，不是特定 Argo CD / Flux 版本的实现文档。 |
| T1 | Terraform state 锁与并发 | [HashiCorp — State Locking](https://developer.hashicorp.com/terraform/language/state/locking) | 支持锁的 backend 会对可能写 state 的操作加锁，避免多个写入者。 | 并非所有 backend 支持锁；不能把强制解锁当默认恢复手段。 |
| T2 | Terraform drift | [HashiCorp — Manage resource drift](https://developer.hashicorp.com/terraform/tutorials/state/resource-drift) | 说明配置、state 与真实资源的偏离，并用 refresh-only plan 展示差异。 | refresh-only 关注 state 变化，不会把基础设施恢复成配置；示例云资源操作可能收费。 |
| O1 | Prometheus 指标与高基数 | [Prometheus — Instrumentation](https://prometheus.io/docs/practices/instrumentation/) | 每个标签组合新增时序，消耗内存、CPU、存储和网络；提供指标设计思路。 | 页面中的数量建议是经验指南，不作为题目统一上限。 |
| O2 | OpenTelemetry 采集架构 | [OpenTelemetry — Deploy the Collector](https://opentelemetry.io/docs/collector/deploy/) | 提供 Agent 与 Gateway 两类部署模式入口，区分本地采集与集中导出。 | 旧 `/collector/deployment/` 已重定向；该页只支持部署模式主题，容量参数需自行估算。 |
| D1 | 灾备、RTO / RPO、备份与恢复 | [AWS — Disaster recovery options](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html) | 对比备份恢复、pilot light、warm standby 和多站点方案及恢复目标取舍。 | 厂商架构建议，不代表其他云的具体能力；复制不能代替防误删的备份与恢复演练。 |

## 题目编排建议

### 补充核验

- **L2**：[Linux Kernel · cgroup v2](https://cdn.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html)，主代理已打开官方正文，支持 CPU 配额、内存控制与资源隔离主题；不把 latest 文档中的全部接口当作所有生产内核都支持。
- **D2**：[PostgreSQL 17 · Continuous Archiving and PITR](https://www.postgresql.org/docs/17/continuous-archiving.html)，主代理已打开官方正文，支持基础备份、连续 WAL 与时间点恢复主题；只用于练习推演，不提供直接覆盖生产数据的命令。
- **S5**：[Google SRE · Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)，主代理已打开官方正文，支持错误预算消耗与告警窗口的讨论；数值阈值由练习自行设定。

以下映射是本站编辑推导，不是来源原题。具体分组和顺序可按最终题库调整。

| 分组 | 原创练习方向 | 主题依据 |
| --- | --- | --- |
| 场景 | 发布后 5xx 上涨，确定止损、回滚与影响面 | S1、S2、K3 |
| 场景 | Pod CrashLoopBackOff，区分启动失败、探针和资源问题 | K1、K2、K3 |
| 场景 | Pending 长时间不调度，检查资源请求与事件 | K1、K2 |
| 场景 | 内存告警与 OOM，区分工作集、泄漏和节点压力 | K2、L1 |
| 场景 | 延迟升高但 CPU 不满，寻找 IO / 内存压力证据 | L1、K2 |
| 场景 | 部分 Pod DNS 解析失败 | K5 |
| 场景 | 证书更新后部分客户端 TLS 失败 | N1 |
| 场景 | HPA 扩容滞后或来回抖动 | K4、K2 |
| 场景 | 指标标签爆炸导致监控不可用 | O1 |
| 场景 | Terraform 执行冲突与人工修改漂移 | T1、T2 |
| 场景 | 构建流水线凭据暴露或第三方依赖风险 | C1、C2 |
| 场景 | 备份成功但恢复演练失败 | D1、S2 |
| 设计 | 统一 CI/CD 平台与环境晋级、审批、回退 | C1、C2、S1 |
| 设计 | 多集群 GitOps 交付与调谐边界 | G1、C1 |
| 设计 | 指标、日志、链路采集平台 | O1、O2 |
| 设计 | SLO 告警与值班响应平台 | S1、S2、O1 |
| 设计 | 基础设施自助交付与 IaC 状态管理 | T1、T2、C2 |
| 设计 | 容量管理与弹性伸缩 | K2、K4、S1 |
| 设计 | 跨地域灾备及恢复演练 | D1 |
| 设计 | 制品可信供应链与部署身份 | C1、C2 |
| 设计 | 降低 Toil 的自动化运维平台 | S4、S2 |
| 设计 | 服务上线可靠性门禁与复盘改进闭环 | S1、S2、S3 |
| 知识 | SLI / SLO、错误预算、事故协作、复盘、Toil | S1、S2、S3、S4 |
| 知识 | 资源请求与限制、三类探针、HPA | K2、K3、K4 |
| 知识 | DNS、TLS、Linux 资源压力 | K5、N1、L1 |
| 知识 | GitOps / IaC、短期凭据与流水线权限、监控指标基数 | G1、T1、T2、C1、C2、O1 |

## 访问与使用记录

- 本轮所列 19 个页面均成功打开；未使用搜索摘要替代正文核验，未访问付费或登录后的内容。
- 上表已记录 Kubernetes、OpenTelemetry 的重定向新地址，题目来源优先使用规范地址。
- Google SRE 网页属于公开阅读的书籍内容；这里只抽象主题并链接，不复制章节、图表或长段文本。
- 这批来源是工程技术的一手资料，不是“企业面试真题”的证据；若未来要补公司归属，必须另找候选人原始面经并标注自述性质。
- 工具版本、默认值和云平台能力会变化。题目应优先考察诊断路径和设计取舍，而不是未经再次核验的固定参数。

## SRE 日常工作增补选题来源

核验日期：2026-09-09。以下均为第一方公开资料，用于原创问题选题和概念边界核验；不构成企业真题或面试频率排名证明。新增练习只展示问题，不附答案。计划覆盖 SLO、可观测、应急、容量、容灾五组，每组五题。

### SLO 日常治理

- [Google SRE：Implementing SLOs](https://sre.google/workbook/implementing-slos/)：支持从关键用户行为选择 SLI、明确好事件与总事件口径、误差预算计算、发布决策和持续改进目标。不能把所有服务的 SLO 简化为单一可用率；客户端、负载均衡器、服务端观测的覆盖范围不同。
- [Google SRE：Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)：支持预算燃烧率、多窗口和低流量告警选题。低流量单次失败可能产生很高燃烧率；合成流量、分组聚合、目标调整都有边界，不能暗示忽略少量高价值请求。

### 可观测日常

- [Google SRE：Monitoring](https://sre.google/workbook/monitoring/)：支持告警噪音治理、监测覆盖、数据新鲜度、配置测试，以及指标和日志的取舍。
- [Prometheus：Histograms and summaries](https://prometheus.io/docs/practices/histograms/)：支持跨实例 P99 聚合选题。不能简单平均预计算分位数；题目应区分 Summary、经典 Histogram 和 Native Histogram，而非假设所有直方图查询方式相同。
- [OpenTelemetry：Sampling](https://opentelemetry.io/docs/concepts/sampling/) 与 [Context propagation](https://opentelemetry.io/docs/concepts/context-propagation/)：支持采样成本、头部/尾部采样及跨服务关联断裂选题。不能假设低采样仍完整保留所有失败链路，也不能把具有 Trace ID 等同于上下文始终完整传播。
- [Prometheus：Alerting](https://prometheus.io/docs/practices/alerting/)：包含 Metamonitoring，支持监控系统自监控、端到端告警链路测试和独立黑盒兜底。

### 应急与值班

- [Google SRE：On-Call](https://sre.google/workbook/on-call/)：支持交接、升级路径、Playbook 维护和先减轻用户影响的选题。文中的轮值人数和事件上限是组织实例，不是通用硬性标准。
- [Google SRE：Incident Response](https://sre.google/workbook/incident-response/)：支持事件分级、指挥与响应角色、记录、沟通和协同止损。
- [Google SRE：Postmortem Culture](https://sre.google/workbook/postmortem-culture/)：支持无责复盘、行动项、责任人、跟踪验证。复盘应改进系统，而不是只归责某个人或把“加强培训”视为全部结论。

### 容量与成本

- [Google SRE：Introduction](https://sre.google/sre-book/introduction/)：Capacity Planning 段落明确区分自然增长与营销/发布等非自然增长，并要求需求预测覆盖容量交付提前量。
- [Google SRE：Non-Abstract Large System Design](https://sre.google/workbook/non-abstract-design/)：支持容量测算、失效域、冗余和故障后余量。N−1 是练习中的故障假设，不代表只少一台实例就覆盖所有可用区故障。
- [Google SRE：Managing Load](https://sre.google/workbook/managing-load/)：支持负载、过载保护和流量管理之间的取舍。
- [AWS：Test scalability and performance requirements](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_testing_resiliency_test_non_functional.html)：支持基线、压测、资源/伸缩设置和弹性验证；使用当前页面实际编号 REL12-BP03，避免沿用旧版 BP04。
- [AWS：Manage service quotas and constraints](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/manage-service-quotas-and-constraints.html)：支持配额水位、调整提前量和容灾场景配额问题。配额充足不等于保证实际资源可供应。

### 容灾与恢复演练

- [AWS：Plan for Disaster Recovery](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/plan-for-disaster-recovery-dr.html)：支持按业务需求确定 RPO/RTO、区分高可用和整套工作负载恢复。
- [AWS：Use defined recovery strategies to meet the recovery objectives](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_for_recovery_disaster_recovery.html)：支持恢复策略、成本取舍、多地写冲突、回切数据一致性及 Runbook。复制不能替代备份，切流成功也不代表业务恢复完成；文中的时间级别是策略示例，不是任何部署都能达到的保证。
- [AWS：Test disaster recovery implementation to validate the implementation](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_dr_tested.html)：支持定期实际切换、验证 RPO/RTO 和恢复路径，不把“备份任务成功”等同于“已验证可恢复”。
- [AWS FIS：Stop conditions](https://docs.aws.amazon.com/fis/latest/userguide/stop-conditions.html)：支持基于稳态业务/技术指标设置演练停止阈值。停止注入不保证业务自动恢复，问题应继续覆盖恢复动作及其验证。

### 编写边界

- 以上资料提供工程实践依据；具体阈值、业务分级、事件等级和演练范围均应在题目中明确为待讨论的方案，不能冒充统一行业规定。
- “SLO 复盘目标”“N−1 容量验收”“切换时防止双写/脑裂”等为本站结合资料编写的讨论角度，并非对原文章节标题的逐字摘录。
