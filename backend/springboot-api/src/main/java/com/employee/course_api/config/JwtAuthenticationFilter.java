package com.employee.course_api.config;

import com.employee.course_api.util.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        try {
            username = jwtUtil.extractUsername(jwt);
            logger.info("Extracted username: " + username);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                
                if (jwtUtil.validateToken(jwt)) {
                    Claims claims = jwtUtil.getAllClaims(jwt);
                    logger.info("JWT Claims: " + claims);
                    
                    List<GrantedAuthority> authorities = new ArrayList<>();
                    // Try different potential claim keys for role
                    Object role = claims.get("role");
                    if (role == null) {
                         role = claims.get("http://schemas.microsoft.com/ws/2008/06/identity/claims/role");
                    }
                    
                    if (role != null) {
                        String roleStr = role.toString();
                        logger.info("Found role claim: " + roleStr);
                        if (!roleStr.toUpperCase().startsWith("ROLE_")) {
                            roleStr = "ROLE_" + roleStr;
                        }
                        authorities.add(new SimpleGrantedAuthority(roleStr.toUpperCase()));
                    } else {
                        logger.warn("No role claim found in JWT");
                    }

                    UserDetails userDetails = new User(username, "", authorities);

                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    logger.info("User authenticated: " + username + " with authorities: " + authorities);
                } else {
                    logger.warn("Token validation failed for token: " + jwt);
                }
            }
        } catch (Exception e) {
            logger.error("Could not set user authentication in security context", e);
        }
        filterChain.doFilter(request, response);
    }
}
