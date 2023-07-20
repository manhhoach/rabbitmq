
-ready: message đang trong queue đang chờ consume sử dụng
-unacked: message mà client đã nhận(hoặc đã xử lý, hoặc xử lý lỗi) nhưng KO báo hiệu rằng mình đã nhận


Khi một message được gửi đến RabbitMQ và có các consumer đăng ký để xử lý message từ hàng đợi đó, RabbitMQ sẽ gán message đó cho một consumer cụ thể để xử lý.

Message được gán cho consumer đó sẽ chuyển sang trạng thái "unacked" (unacknowledged) cho đến khi consumer hoàn thành xử lý message đó và gửi lại sự xác nhận (acknowledgment) cho RabbitMQ.

Nếu consumer không gửi lại sự xác nhận hoặc xảy ra lỗi trong quá trình xử lý, message vẫn sẽ ở trạng thái "unacked" và không được xem là đã được xử lý thành công.

Sau một khoảng thời gian chờ nhất định (timeout), RabbitMQ sẽ giả định rằng consumer đó không xử lý thành công và message sẽ được chuyển lại vào hàng đợi.

Message được chuyển lại hàng đợi sẽ trở thành "ready" và sẵn sàng để được gán cho một consumer khác để xử lý lại.

Quá trình này tiếp tục cho đến khi message được consumer nào đó xử lý thành công và gửi lại sự xác nhận, hoặc khi message đã vượt quá số lần cố gắng tối đa và được đưa vào một hàng đợi chết (dead-letter queue) để xử lý riêng.


durable phải đi kèm persistent để lưu lại message chưa kịp xử lý mỗi khi restart rabbitmq