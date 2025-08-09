class Attendance {
  final int id;
  final int userId;
  final String date;
  final String status;
  final String createdAt;

  Attendance({
    required this.id,
    required this.userId,
    required this.date,
    required this.status,
    required this.createdAt,
  });

  factory Attendance.fromJson(Map<String, dynamic> json) {
    String dateStr = json['date'];
    if (dateStr.contains('T')) {
      dateStr = dateStr.split('T')[0];
    }
    return Attendance(
      id: json['id'],
      userId: json['user_id'],
      date: dateStr,
      status: json['status'],
      createdAt: json['created_at'] ?? '',
    );
  }
}
