import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user.dart';
import '../models/attendance.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:3000/api';

  Future<List<User>> getUsers() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/users'));
      if (response.statusCode == 200) {
        List jsonResponse = jsonDecode(response.body);
        return jsonResponse.map((data) => User.fromJson(data)).toList();
      } else {
        throw Exception('Failed to load users: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  Future<void> markAttendance(int userId, String status) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/attendance'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'user_id': userId,
          'date': DateTime.now().toIso8601String().split('T')[0],
          'status': status,
        }),
      );
      if (response.statusCode != 200) {
        throw Exception('Failed to mark attendance: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  Future<List<Attendance>> getAttendanceHistory(int userId) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/attendance/user/$userId'),
      );
      if (response.statusCode == 200) {
        List jsonResponse = jsonDecode(response.body);
        return jsonResponse.map((data) => Attendance.fromJson(data)).toList();
      } else {
        throw Exception(
          'Failed to load attendance history: ${response.statusCode}',
        );
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  Future<List<Attendance>> getAllAttendance() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/attendance'));
      if (response.statusCode == 200) {
        List jsonResponse = jsonDecode(response.body);
        return jsonResponse.map((data) => Attendance.fromJson(data)).toList();
      } else {
        throw Exception(
          'Failed to load all attendance records: ${response.statusCode}',
        );
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
}
