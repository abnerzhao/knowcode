# 数据与中间件：选题来源

核对日期：2026-09-09。覆盖 MySQL、Redis、Elasticsearch（ES）、Apache Kafka；用户确认原请求中的 Mafka 指 Apache Kafka。

本习题册按基础知识与常见面试复习主题组织，由本站重新组织问题，不转载完整资料、不提供答案或答题提示。下面的官方文档用于校验主题与技术边界，不代表企业真题，也不构成面试频率统计。难度为本站练习分级。

## MySQL

采用 MySQL 8.4 / InnoDB 作为明确的参考口径，不将其标为最新版本。

- [Clustered and Secondary Indexes](https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html)：聚簇索引、二级索引、主键选择、回表。
- [Multiple-Column Indexes](https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html)：联合索引、列顺序与最左前缀。
- [Optimizing Queries with EXPLAIN](https://dev.mysql.com/doc/refman/8.4/en/using-explain.html)：执行计划、索引选择、慢 SQL 排查。
- [Transaction Isolation Levels](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html)：隔离级别、一致性读与锁定读的边界。
- [InnoDB Multi-Versioning](https://dev.mysql.com/doc/refman/8.4/en/innodb-multi-versioning.html)：MVCC、历史版本、Undo 与长事务。
- [InnoDB Locking](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html)：记录锁、间隙锁、Next-Key Lock、意向锁。
- [Replication](https://dev.mysql.com/doc/refman/8.4/en/replication.html)：二进制日志、复制、主从延迟与故障恢复。
- [Data Types](https://dev.mysql.com/doc/refman/8.4/en/data-types.html)：数值、字符串、日期时间与类型选择。
- [Redo Log](https://dev.mysql.com/doc/refman/8.4/en/innodb-redo-log.html)：重做日志、刷盘与崩溃恢复。
- [The Binary Log](https://dev.mysql.com/doc/refman/8.4/en/binary-log.html)：Binlog 的作用、格式及与存储引擎日志的区别。
- [Optimization and Indexes](https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html)：索引优化主题入口。
- [Partitioning](https://dev.mysql.com/doc/refman/8.4/en/partitioning.html)：分区类型、裁剪、限制及与分库分表的区别。

选题边界：题干涉及快照创建时间、幻读和锁范围时，必须给出隔离级别，并区分普通 SELECT、锁定读及写语句，避免将一个隔离级别的结论泛化到所有事务。[官方隔离级别说明](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html)

## Redis

- [Redis data types](https://redis.io/docs/latest/develop/data-types/)：数据类型与适用场景，类型内部编码应按具体版本讨论。
- [Redis persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)：RDB、AOF、重写、恢复与持久化取舍。
- [Redis replication](https://redis.io/docs/latest/operate/oss_and_stack/management/replication/)：全量与部分同步、异步复制、故障切换的数据边界。
- [Redis cluster specification](https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/)：哈希槽、重定向、迁移、多 Key 操作与故障处理。
- [Transactions](https://redis.io/docs/latest/develop/using-commands/transactions/)：MULTI/EXEC、WATCH、错误处理；避免套用关系数据库事务的回滚语义。
- [Key eviction](https://redis.io/docs/latest/develop/reference/eviction/)：内存上限、淘汰策略、LRU/LFU 与过期机制的区别。
- [Diagnosing latency issues](https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/latency/)：慢命令、持久化、系统资源与延迟诊断。
- [Distributed Locks with Redis](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/)：加锁/解锁原子性、租约、持有者标识、故障与时间假设。
- [Redis programmability](https://redis.io/docs/latest/develop/programmability/)：Lua 脚本、Functions、原子执行与长脚本风险。
- [EXPIRE](https://redis.io/docs/latest/commands/expire/)：TTL、过期语义、主从与持久化中的过期处理。

选题边界：不要把 Redis 复制描述成默认强一致，也不要把分布式锁描述成无条件互斥；需让题目交代实例/集群形态及故障模型。当前锁文档包含 Redis 8.4 引入的 DELEX，不能用于未声明版本的通用题干。[复制说明](https://redis.io/docs/latest/operate/oss_and_stack/management/replication/)、[锁的适用假设与版本说明](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/)

## Elasticsearch

- [Mapping](https://www.elastic.co/docs/manage-data/data-store/mapping)：字段类型、动态与显式 Mapping、建模。
- [Text analysis](https://www.elastic.co/docs/manage-data/data-store/text-analysis)：分词、索引与查询分析流程、全文检索。
- [Near real-time search](https://www.elastic.co/docs/manage-data/data-store/near-real-time-search)：段、Refresh、写入后搜索可见性。
- [Reading and writing documents](https://www.elastic.co/docs/deploy-manage/distributed-architecture/reading-and-writing-documents)：路由、主副分片写入、协调节点和分布式读取。
- [Query and filter context](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-filter-context)：查询、过滤、相关性评分与缓存。
- [Paginate search results](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/paginate-search-results)：深分页、search_after、PIT 与 Scroll。
- [Size your shards](https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/size-shards)：分片数量、大小、容量规划和过度分片。
- [Shard allocation, relocation, and recovery](https://www.elastic.co/docs/deploy-manage/distributed-architecture/shard-allocation-relocation-recovery)：分片分配、迁移、恢复与副本。
- [Query DSL](https://www.elastic.co/docs/reference/query-languages/querydsl)：叶子/复合查询、match、term、bool 与昂贵查询。
- [Aggregations](https://www.elastic.co/docs/explore-analyze/query-filter/aggregations)：指标、桶、管道聚合与分析场景。
- [Index lifecycle management](https://www.elastic.co/docs/manage-data/lifecycle/index-lifecycle-management)：索引生命周期、滚动、数据分层与保留策略；该功能不适用于 Elasticsearch Serverless。

选题边界：Refresh 关联搜索可见性，不等同于持久化提交；分页题不应把 Scroll 作为所有深分页场景的默认方案。默认刷新周期等配置受到部署形态与索引设置影响，题干宜问机制，不写死为通用承诺。[近实时搜索说明](https://www.elastic.co/docs/manage-data/data-store/near-real-time-search)、[分页 API](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/paginate-search-results)

## Apache Kafka

采用 Kafka 4.1 文档作为固定参考口径，不将其标为最新版本；旧版机制只作为明确的对比主题。

- [Design](https://kafka.apache.org/41/design/design/)：分区日志、批量与顺序 I/O、拉取消费、Offset、复制、消息交付语义、事务及日志压缩。
- [Producer Configs](https://kafka.apache.org/41/configuration/producer-configs/)：acks、幂等、重试、批量、压缩和发送超时。
- [Consumer Configs](https://kafka.apache.org/41/configuration/consumer-configs/)：消费组、Offset 提交与重置、心跳、poll、事务消息可见性。
- [Upgrading](https://kafka.apache.org/41/getting-started/upgrade/)：KRaft、ZooKeeper 历史对比、新消费组协议、版本兼容。
- [KRaft](https://kafka.apache.org/41/operations/kraft/)：控制器角色、元数据仲裁与运维。
- [Consumer Rebalance Protocol](https://kafka.apache.org/41/operations/consumer-rebalance-protocol/)：新消费组协议与增量再均衡。
- [Topic Configs](https://kafka.apache.org/41/configuration/topic-configs/)：日志保留、清理、分段、压缩及副本约束。
- [Kafka Streams Core Concepts](https://kafka.apache.org/41/streams/core-concepts/)：流处理、时间语义、状态与 Exactly-Once 的范围。

选题边界：Kafka 4.0 起不支持 ZooKeeper 模式，不出“现版本必须依赖 ZooKeeper”的前提题。再均衡、心跳配置等要区分 classic 与 consumer 协议。恰好一次题应明确 Kafka 内部事务和外部数据库副作用的边界，而不是宣称打开一个开关即可端到端绝对不重不丢。[升级说明](https://kafka.apache.org/41/getting-started/upgrade/)、[消费者配置](https://kafka.apache.org/41/configuration/consumer-configs/)、[交付语义设计](https://kafka.apache.org/41/design/design/)

## 数据维护约定

- 题目正文仅包含问题；来源保存在元数据和本文中，不强加答案、示例、答题模板或参考结论。
- 引用按题目主题选择上述精确页面，不使用搜索结果页或非官方镜像。
- 题干中出现默认参数、功能可用性或版本变化时，应重新核对指定版本的官方文档。
