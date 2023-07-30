Round-robin: phân phối lần lượt message tới các consumer
prefetch: rabbitmq phân phối message tới các consumer mà đang rảnh, để tránh 1 consumer nhận quá nhiều msg khi chưa xử lý xong msg hiện tại
durable phải đi kèm persistent để lưu lại message chưa kịp xử lý mỗi khi restart rabbitmq
exclusive: để 1 queue chỉ được kết nối và sử dụng bởi 1 app duy nhất

noAck: false -> rabbit sẽ chờ consumer phản hồi lại trong 1 khoảng time, nếu qua khoảng time hoặc consumer lỗi (k xử lý được) thì sẽ lại đẩy msg đó vào queue cho consumer khác xử lý, còn nếu consumer phản hồi lại thì sẽ xóa

noAck: true -> rabbit coi như là consumer xử lý msg thành công nên sẽ tự động xóa msg



Consumer gửi msg đến exchange, exchange sẽ gửi msg đến queue, tuy nhiên
Cách exchange phân phối message đến queue tùy thuộc mỗi loại exchange (fanout, header, topic, ..)
-Fanout: exchange phân phối msg đến tất cả các queue mà nó liên kết => mô hình pub/sub
-Direct: exchange phân phối msg đến queue mà có routing key trùng khớp với routing key của msg
-Topic:
*: biểu diễn cho 1 đoạn
#: cho nhiều đoạn
các đoạn sẽ ngăn cách = dấu .
ví dụ:

*.error: product.error, xxx.error
error.*: error.noti, error.yyy
*.*.error: x.y.error
error.*.*: error.noti.ooo
*.error.*: x.error.y

#.error: a.error, xd.tgfh.sh.error
error.#: error.aga.gv, ....