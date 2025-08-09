class User {
  final int id;
  final String name;
  final String email;
  final String role;
  final int? groupId;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    this.groupId,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      role: json['role'],
      groupId: json['group_id'],
    );
  }
}
